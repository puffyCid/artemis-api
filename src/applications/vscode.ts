import { Entries, FileHistory, RecentFiles, RecentType, VscodeProfile, VscodeStorage } from "../../types/applications/vscode";
import { AccessorProtocol, EntryKind, SourceHandle } from "../../types/filesystem/accessor";
import { getSystemDrive } from "../environment/env";
import { Accessor } from "../filesystem/accessor";
import { FileError } from "../filesystem/errors";
import { readTextFile } from "../filesystem/files";
import { DirectoryTree, isFileEntry } from "../filesystem/tree";
import { SystemError } from "../system/error";
import { Output, OutputManager } from "../system/output";
import { detectPlatform, PlatformType } from "../system/systeminfo";
import { unixEpochToISO } from "../time/conversion";

/**
 * Class to extract Vscode information
 */
export class Vscode {
  private profiles: VscodeProfile[] = [];
  private protocol: AccessorProtocol = AccessorProtocol.Host;
  private accessor = new Accessor();
  private source: SourceHandle | FileError;
  private platform = PlatformType.Linux;

  /**
   * Construct a `Vscode` object that can be used to parse Vscode logs
   * @param [protocol=AccessorProtocol.Host] `AccessorProtocol` to use when accessing Epiphany data. Default is `AccessorProtocol.Host`
   * @param [source_path="host:"] Default source path to use when accessing Epiphany data. Default is `host:` which represents a live system.  
   * For disk image source the `source_path` should be absolute path to the disk image. Ex: `/evidence/fedora.qcow2`
   * @param alt_path Optional alternative path to Vscode directory
   * @returns `Vscode` instance class
   */
  constructor (protocol = AccessorProtocol.Host, source_path = "host:", alt_path?: string) {
    this.protocol = protocol;
    const pattern = alt_path ?? this.profilePath();

    this.source = this.accessor.openSource(source_path, this.protocol);
    if (this.source instanceof FileError) {
      return;
    }

    const matches = this.accessor.sourceGlobfs(this.source, pattern);
    if (matches instanceof FileError) {
      return;
    }

    for (const entry of matches) {
      // We want the base directory for Epiphany artifacts
      if (entry.meta.kind !== EntryKind.Directory) {
        continue;
      }

      const tree = DirectoryTree.fromEntry(this.accessor, this.source, entry);
      if (tree instanceof FileError) {
        continue;
      }

      const profile: VscodeProfile = {
        tree,
      };

      this.profiles.push(profile);
    }
  }

  /**
   * Extract VScode file history
   * @param alt_path Optional alternative path to `entries.json`
   * @returns Array of `FileHistory`
   */
  public history(alt_path?: string): FileHistory[] {
    const history: FileHistory[] = [];
    for (const profile of this.profiles) {
      const pattern = alt_path ?? this.historyPath();
      const matches = profile.tree.glob(pattern);
      if (matches instanceof FileError) {
        continue;
      }

      for (const entry of matches) {
        if (!isFileEntry(entry)) {
          continue;
        }

        const text = readTextFile(entry.handle);
        if (text instanceof FileError) {
          console.warn(`Failed to read '${entry.meta.display_path}': ${text}`);
          continue;
        }

        try {
          const json_data: FileHistory = JSON.parse(text);
          json_data.evidence = entry.meta.display_path;
          const file_entries = json_data[ "entries" ] as Entries[];

          // Loop through each history entry and read the contents
          for (let i = 0; i < file_entries.length; i++) {
            const value = file_entries[ i ];
            if (value === undefined) {
              continue;
            }
            const flat_data: FileHistory = {
              version: json_data.version,
              resource: json_data.resource,
              evidence: json_data.evidence,
              message: `${json_data.resource} - History Entry: ${value.id}`,
              datetime: unixEpochToISO(Number(value.timestamp)),
              timestamp_desc: "File Saved",
              artifact: "File History",
              data_type: "applications:vscode:filehistory:entry",
              id: value.id,
              file_saved: unixEpochToISO(Number(value.timestamp)),
              path: json_data.resource.replace("file://", ""),
              source: value.source ?? "",
              sourceDescription: value.sourceDescription ?? ""
            };

            history.push(flat_data);
          }
        } catch (e) {
          console.warn(`Failed to parse '${entry.meta.display_path}': ${e}`);
          continue;
        }
      }
    }

    return history;
  }

  /**
   * Extract VScode extensions
   * @param alt_path Optional alternative path to `extensions.json`
   * @returns Array of `Record<string, unknown>`
   */
  public extensions(alt_path?: string): Record<string, unknown>[] {
    let ext: Record<string, unknown>[] = [];
    for (const profile of this.profiles) {
      const pattern = alt_path ?? this.extensionPath();
      const matches = profile.tree.glob(pattern);
      if (matches instanceof FileError) {
        continue;
      }

      for (const entry of matches) {
        if (!isFileEntry(entry)) {
          continue;
        }

        const text = readTextFile(entry.handle);
        if (text instanceof FileError) {
          console.warn(`Failed to read '${entry.meta.display_path}': ${text}`);
          continue;
        }

        try {
          const json_data: Record<string, unknown>[] = JSON.parse(text);
          const data = json_data.map(value => ({
            ...value,
            evidence: entry.meta.display_path
          }));
          ext = ext.concat(data);

        } catch (e) {
          console.warn(`Failed to parse '${entry.meta.display_path}': ${e}`);
          continue;
        }
      }
    }

    return ext;
  }

  /**
   * Extract VScode recent files
   * @param alt_path Optional alternative path to `storage.json`
   * @returns Array of `RecentFiles`
   */
  public recent(alt_path?: string): RecentFiles[] {
    const recents: RecentFiles[] = [];

    for (const profile of this.profiles) {
      const pattern = alt_path ?? this.recentPath();
      const matches = profile.tree.glob(pattern);
      if (matches instanceof FileError) {
        continue;
      }

      for (const entry of matches) {
        if (!isFileEntry(entry)) {
          continue;
        }

        const text = readTextFile(entry.handle);
        if (text instanceof FileError) {
          console.warn(`Failed to read '${entry.meta.display_path}': ${text}`);
          continue;
        }

        try {
          const storage_data = JSON.parse(text) as VscodeStorage;
          if (storage_data.lastKnownMenubarData === undefined) {
            continue;
          }

          for (const item of storage_data.lastKnownMenubarData.menus.File.items) {
            if (item.id !== "submenuitem.MenubarRecentMenu" || item.submenu === undefined) {
              continue;
            }

            for (const entries of item.submenu.items) {
              if (entries.uri === undefined) {
                continue;
              }

              const recent: RecentFiles = {
                path_type: entries.id == "openRecentFolder" ? RecentType.Folder : RecentType.File,
                path: entries.uri.path,
                enabled: entries.enabled ?? false,
                label: entries.label ?? "",
                external: entries.uri.external,
                evidence: entry.meta.display_path,
              };

              recents.push(recent);

            }
          }
        } catch (e) {
          console.warn(`Failed to parse '${entry.meta.display_path}': ${e}`);
          continue;
        }
      }
    }

    return recents;
  }

  public retrospect(format: Output): void {
    const manager = new OutputManager(format);
    const files = this.history();
    let status = manager.write_artifact(files, "retrospect_vscode_file_history");
    if (status instanceof SystemError) {
      console.error(`Failed timeline VSCode file history cookies: ${status}`);
    }

    const ext = this.extensions();
    status = manager.write_artifact(ext, "retrospect_vscode_extensions");
    if (status instanceof SystemError) {
      console.error(`Failed timeline VSCode extensions: ${status}`);
    }

    const recent = this.recent();
    status = manager.write_artifact(recent, "retrospect_vscode_recent_files");
    if (status instanceof SystemError) {
      console.error(`Failed timeline VSCode Recent Files: ${status}`);
    }
  }

  /**
   * Return the VSCode profile base directory
   * @returns Base path to VSCode files
   */
  private profilePath(): string {
    this.platform = detectPlatform();
    switch (this.platform) {
      case PlatformType.Windows: return `${getSystemDrive()}\\Users`;
      case PlatformType.Darwin: return "/Users";
      case PlatformType.Linux: return "/home";
      default: {
        console.warn(`Unsupported platform. Defaulting to '/home'`);
        return "/home";
      }
    }
  }

  /**
   * Determine path to `entries.json`
   * @returns Path to VSCode history file
   */
  private historyPath(): string {
    switch (this.platform) {
      case PlatformType.Windows: return `*\\AppData\\Roaming\\*Cod*\\User\\History\\*\\entries.json`;
      case PlatformType.Darwin: return "*/.vscode*/extensions/entries.json";
      case PlatformType.Linux: return "*/.config/*Cod*/User/History/*/entries.json";
      default: {
        console.warn(`Unsupported platform. Defaulting to '*/.config/*Cod*/User/History/*/entries.json'`);
        return "*/.config/*Cod*/User/History/*/entries.json";
      }
    }
  }

  /**
   * Determine path to `extensions.json`
   * @returns Path to VSCode extensions file
   */
  private extensionPath(): string {
    switch (this.platform) {
      case PlatformType.Windows: return `*\\.vscode*\\extensions\\extensions.json`;
      case PlatformType.Darwin: return "*/Library/Application Support/*Cod*/User/History/*/extensions.json";
      case PlatformType.Linux: return "*/.vscode*/extensions/extensions.json";
      default: {
        console.warn(`Unsupported platform. Defaulting to '*/.vscode*/extensions/extensions.json'`);
        return "*/.vscode*/extensions/extensions.json";
      }
    }
  }

  /**
   * Determine path to `storage.json`
   * @returns Path to VSCode recent files
   */
  private recentPath(): string {
    switch (this.platform) {
      case PlatformType.Windows: return `*\\AppData\\Roaming\\*Cod*\\User\\globalStorage\\storage.json`;
      case PlatformType.Darwin: return "*/Library/Application Support/*Cod*/User/globalStorage/storage.json";
      case PlatformType.Linux: return "*/.config/*Cod*/User/globalStorage/storage.json";
      default: {
        console.warn(`Unsupported platform. Defaulting to '*/.config/*Cod*/User/globalStorage/storage.json`);
        return "*/.config/*Cod*/User/globalStorage/storage.json";
      }
    }
  }
}
