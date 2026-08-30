import { DebPackages } from "../../types/linux/deb";
import { FileError } from "../filesystem/errors";
import { readTextFile } from "../filesystem/files";
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
  const packages: DebPackages[] = [];
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
    message: "",
    timestamp_desc: "None",
    artifact: "DEB Package",
    data_type: "linux:deb:entry",
    evidence: path,
    datetime: "1970-01-01T00:00:00.000Z"
  };
  for (const line of package_lines) {

    if (line.startsWith("Package: ")) {
      deb.name = line.substring("Package: ".length);
      deb.message = `DEB package '${deb.name}'`;
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
    } else if (line === "" && deb.name !== "") {
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
        message: "",
        timestamp_desc: "None",
        artifact: "DEB Package",
        data_type: "linux:deb:entry",
        evidence: path,
        datetime: "1970-01-01T00:00:00.000Z"
      };
    }
  }

  return packages;
}

/**
 * Function to test DEB package parsing  
 * This function should not be called unless you are developing the artemis-api  
 * Or want to validate the DEB package parsing
 */
export function testDebInfo(): void {
  const deb = "../../test_data/linux/deb/status";
  const results = getDebInfo(deb);
  if (results instanceof LinuxError) {
    throw results;
  }

  if (results.length !== 327) {
    throw `Got ${results.length} expected 327.......getDebInfo ❌`;
  }

  if (results[ 0 ] === undefined) {
    throw `Got undefined name expected adduser.......getRpmInfo ❌`;
  }


  if (results[ 0 ].name != "adduser") {
    throw `Got ${results[ 0 ].name} expected adduser.......getDebInfo ❌`;
  }

  if (results[ 0 ].datetime != "1970-01-01T00:00:00.000Z") {
    throw `Got ${results[ 0 ].datetime} expected "1970-01-01T00:00:00.000Z".......getDebInfo ❌`;
  }

  if (results[ 0 ].message != "DEB package 'adduser'") {
    throw `Got ${results[ 0 ].message} expected DEB package 'adduser'.......getDebInfo ❌`;
  }
}