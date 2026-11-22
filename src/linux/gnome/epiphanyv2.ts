import { AccessorProtocol, EntryKind, SourceHandle } from "../../../types/filesystem/accessor";
import { EpiphanyProfiles } from "../../../types/linux/gnome/epiphany";
import { Accessor } from "../../filesystem/accessor";
import { FileError } from "../../filesystem/errors";

export class Epiphany {
    private profiles: EpiphanyProfiles[] = [];
    private unfold: boolean = false;
    private protocol: AccessorProtocol = AccessorProtocol.Host;
    private accessor = new Accessor();
    private source: SourceHandle | FileError;

    constructor (unfold = false, protocol = AccessorProtocol.Host, source_path = "host:", alt_path?: string) {
        this.unfold = unfold;
        this.protocol = protocol;
        const pattern = alt_path ?? "/home/*/.local/share/epiphany";

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

            const profile: EpiphanyProfiles = {
                full_path: entry.meta.full_path,
                version: 0,
                evidence: entry.meta.display_path,
                entry,
                database: new Map(),
            };

            this.profiles.push(profile);
        }
    }
}