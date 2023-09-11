/**
 * Interface representing the SingleRequirement Code Signing data (0xfade0c00)
 * It can be embedded in apps and plist files
 *
 * References:
 *  - https://opensource.apple.com/source/xnu/xnu-4903.270.47/osfmk/kern/cs_blobs.h
 *  - https://stackoverflow.com/questions/52706542/how-to-get-csreq-of-macos-application-on-command-line
 *  - https://github.com/trilemma-dev/Required
 *  - https://gregoryszorc.com/docs/apple-codesign/stable/apple_codesign_gatekeeper.html
 */
export interface SingleRequirement {
  identifier: string;
  team_id: string;
  cdhash: string;
}
