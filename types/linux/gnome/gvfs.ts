/**
 * GNOME Virtual FileSystem (GVFS) is a userspace filesystem that GNOME applications may use
 * The metadata for the GVFS is typically stored at: `/home/%/.local/share/gvfs-metadata/%`
 *
 * Parsing this data may provide useful information for forensic investigators
 *
 * References:
 * - https://www.sciencedirect.com/science/article/abs/pii/S1742287615001085
 * - https://en.wikipedia.org/wiki/GVfs
 */
export interface GvfsEntry {
   /**Name of GvfsEntry */
   name: string;
   /**Attributes associated with the entry. Example:
      * ```json
      * "metadata": {
             "download-uri": "https://download.freebsd.org/releases/amd64/amd64/ISO-IMAGES/14.1/FreeBSD-14.1-RELEASE-amd64-disc1.iso"
         },
      * ```
      */
   metadata: Record<string, string | string[]>;
   /**Full path of the GvfsEntry */
   path: string;
   /**Last change timestamp of the **metadata** */
   last_change: string;
   /**GFVS file source */
   source: string;
   message: string;
   datetime: string;
   timestamp_desc: "Last Changed";
   artifact: "GNOME Virtual Filesystem";
   data_type: "linux:gnome:gvfs:entry",
}
