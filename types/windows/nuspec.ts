/**
 * Partial implementation of nuspec. Mainly for Chocolatey packages.  
 * 
 * https://learn.microsoft.com/en-us/nuget/reference/nuspec
 * 
 * Sample output:
 * ```json
 * {
    "package": {
        "$": {
            "xmlns": "http://schemas.microsoft.com/packaging/2011/08/nuspec.xsd"
        },
        "metadata": [
            {
                "id": [
                    "7zip"
                ],
                "version": [
                    "23.1.0"
                ],
                "title": [
                    "7-Zip"
                ],
                "authors": [
                    "Igor Pavlov"
                ],
                "owners": [
                    "chocolatey-community,Rob Reynolds"
                ],
                "licenseUrl": [
                    "http://www.7-zip.org/license.txt"
                ],
                "projectUrl": [
                    "http://www.7-zip.org/"
                ],
                "iconUrl": [
                    "https://cdn.jsdelivr.net/gh/chocolatey-community/chocolatey-packages@68b91a851cee97e55c748521aa6da6211dd37c98/icons/7zip.svg"
                ],
                "requireLicenseAcceptance": [
                    "false"
                ],
                "description": [
                    "7-Zip is a file archiver with a high compression ratio.\n\n## Features\n- High compression ratio in [7z format](http://www.7-zip.org/7z.html) with **LZMA** and **LZMA2** compression\n- Supported formats:\n- Packing / unpacking: 7z, XZ, BZIP2, GZIP, TAR, ZIP and WIM\n- Unpacking only: AR, ARJ, CAB, CHM, CPIO, CramFS, DMG, EXT, FAT, GPT, HFS, IHEX, ISO, LZH, LZMA, MBR, MSI, NSIS, NTFS, QCOW2, RAR, RPM, SquashFS, UDF, UEFI, VDI, VHD, VMDK, WIM, XAR and Z.\n- For ZIP and GZIP formats, **7-Zip** provides a compression ratio that is 2-10 % better than the ratio provided by PKZip and WinZip\n- Strong AES-256 encryption in 7z and ZIP formats\n- Self-extracting capability for 7z format\n- Integration with Windows Shell\n- Powerful File Manager\n- Powerful command line version\n- Plugin for FAR Manager\n- Localizations for 87 languages\n\n## Notes\n- The installer for 7-Zip is known to close the Explorer process. This means you may lose current work. If it doesn't automatically restart explorer, type `explorer` on the command shell to restart it.\n- **If the package is out of date please check [Version History](#versionhistory) for the latest submitted version. If you have a question, please ask it in [Chocolatey Community Package Discussions](https://github.com/chocolatey-community/chocolatey-packages/discussions) or raise an issue on the [Chocolatey Community Packages Repository](https://github.com/chocolatey-community/chocolatey-packages/issues) if you have problems with the package. Disqus comments will generally not be responded to.**"
                ],
                "summary": [
                    "7-Zip is a file archiver with a high compression ratio."
                ],
                "releaseNotes": [
                    "http://www.7-zip.org/history.txt"
                ],
                "tags": [
                    "7zip zip archiver admin foss"
                ],
                "packageSourceUrl": [
                    "https://github.com/chocolatey-community/chocolatey-packages/tree/master/automatic/7zip"
                ],
                "docsUrl": [
                    "http://www.7-zip.org/faq.html"
                ],
                "mailingListUrl": [
                    "https://sourceforge.net/p/sevenzip/discussion/45797/"
                ],
                "bugTrackerUrl": [
                    "https://sourceforge.net/p/sevenzip/_list/tickets?source=navbar"
                ],
                "dependencies": [
                    {
                        "dependency": [
                            {
                                "$": {
                                    "id": "7zip.install",
                                    "version": "[23.1.0]"
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
 * ```
 */
export interface Nuspec {
  package: {
    $: {
      xmlns: string;
    };
    metadata: {
      id: string[];
      version: string[];
      title: string[];
      authors: string[];
      description: string[];
      /**NUSPEC states this is deprecated */
      owners?: string[];
      licenseUrl?: string[];
      projectUrl?: string[];
      license?: string[];
      iconUrl?: string[];
      requireLicenseAcceptance?: string[];
      summary?: string[];
      tags?: string[];
      copyright?: string[];
    }[];
  };
}
