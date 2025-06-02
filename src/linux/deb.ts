import { DebPackages } from "../../types/linux/deb";
import { FileError } from "../filesystem/errors";
import { readTextFile } from "../filesystem/mod";
import { LinuxError } from "./errors";

/**
 * Function to get installed DEB packages. Will attempt to parse `/var/lib/dpkg/status` by default.
 * @param alt_path Optional path to the dpkg status file
 * @returns Array of `DebPackages` or `LinuxError`
 */
export function getDebInfo(alt_path?: string): DebPackages[] | LinuxError {
  let path = "/var/lib/dpkg/status";
  if (alt_path !== undefined) {
    path = alt_path;
  }

  const status_data = readTextFile(path);
  if (status_data instanceof FileError) {
    return new LinuxError(
      "DEBPACKAGES",
      `failed to read status file ${path}: ${status_data.message}`,
    );
  }

  const package_lines = status_data.split("\n");
  const packages = [];
  let deb: DebPackages = {
    name: "",
    version: "",
    size: 0,
    arch: "",
    status: "",
    maintainer: "",
    section: "",
    priority: "",
    homepage: "",
    dependencies: [],
  };
  for (const line of package_lines) {
    if (line.startsWith("Package: ")) {
      deb.name = line.substring("Package: ".length);
    } else if (line.startsWith("Status: ")) {
      deb.status = line.substring("Status: ".length);
    } else if (line.startsWith("Priority: ")) {
      deb.priority = line.substring("Priority: ".length);
    } else if (line.startsWith("Section: ")) {
      deb.section = line.substring("Section: ".length);
    } else if (line.startsWith("Installed-Size: ")) {
      deb.size = Number(line.substring("Installed-Size: ".length));
    } else if (line.startsWith("Architecture: ")) {
      deb.arch = line.substring("Architecture: ".length);
    } else if (line.startsWith("Version: ")) {
      deb.version = line.substring("Version: ".length);
    } else if (line.startsWith("Homepage: ")) {
      deb.homepage = line.substring("Homepage: ".length);
    } else if (line.startsWith("Maintainer: ")) {
      deb.maintainer = line.substring("Maintainer: ".length);
    } else if (line.startsWith("Depends: ")) {
      const depends = line.substring("Depends: ".length);
      deb.dependencies = depends.split(", ");
    } else if (line == "" && deb.name !== "") {
      packages.push(deb);
      deb = {
        name: "",
        version: "",
        size: 0,
        arch: "",
        status: "",
        maintainer: "",
        section: "",
        priority: "",
        homepage: "",
        dependencies: [],
      };
    }
  }

  return packages;
}
