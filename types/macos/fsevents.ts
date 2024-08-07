/**
 * `FsEvent` data track changes to files on a macOS system (similar to `UsnJrnl`).
 * Resides at /System/Volumes/Data/.fseventsd/ or /.fseventsd on older systems
 *
 * References:
 *  - https://github.com/libyal/dtformats/blob/main/documentation/MacOS%20File%20System%20Events%20Disk%20Log%20Stream%20format.asciidoc
 *  - http://www.osdfcon.org/presentations/2017/Ibrahim-Understanding-MacOS-File-Ststem-Events-with-FSEvents-Parser.pdf
 */
export interface Fsevents {
  /**Flags associated with FsEvent record */
  flags: string[];
  /**Full path to file associated with FsEvent record */
  path: string;
  /**Node ID associated with FsEvent record */
  node: number;
  /**Event ID associated with FsEvent record */
  event_id: number;
  /**Path to the FsEvent file */
  source: string;
  /**Created timestamp of the FsEvent source */
  source_created: string;
  /**Modified timestamp of the FsEvent source */
  source_modified: string;
  /**Changed timestamp of the FsEvent source */
  source_changed: string;
  /**Accessed timestamp of the FsEvent source */
  source_accessed: string;
}
