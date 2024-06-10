/**
 * Local macOS `Users` information by parsing the plist files at `/var/db/dslocal/nodes/Default/users`
 */
export interface Users {
  /**UID for the user */
  uid: string[];
  /**GID associated with the user */
  gid: string[];
  /**User name */
  name: string[];
  /**Real name associated with user */
  real_name: string[];
  /**Base64 encoded photo associated with user */
  account_photo: string[];
  /**Timestamp the user was created */
  account_created: string;
  /**Password last changed for the user*/
  password_last_set: string;
  /**Shell associated with the user */
  shell: string[];
  /**Unlock associated with the user */
  unlock_options: string[];
  /**Home path associated with user */
  home_path: string[];
  /**UUID associated with user */
  uuid: string[];
}

/**
 * Local macOS `Groups` information by parsing the PLIST files at `/var/db/dslocal/nodes/Default/groups`
 */
export interface Groups {
  /**GID for the group */
  gid: string[];
  /**Name of the group */
  name: string[];
  /**Real name associated with the group */
  real_name: string[];
  /**Users associated with group */
  users: string[];
  /**Group members in the group */
  groupmembers: string[];
  /**UUID associated with the group */
  uuid: string[];
}
