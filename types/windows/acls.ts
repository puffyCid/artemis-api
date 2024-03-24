/**
 * Metadata associated with Access Control Lists on Windows
 *
 * References:
 *  - https://github.com/libyal/libfwnt/blob/main/documentation/Security%20Descriptor.asciidoc
 */
export interface AccessControl {
  /**Access Control Entry (ACE) Type */
  ace_type: string;
  /**Flags associated with ACL */
  flags: string[];
  /**SID associated with ACL */
  sid: string;
  /**Account associated with SID */
  //account: string;
  /**Object flags associated with ACL */
  object_flags: string;
  /**Object GUID associated with ACL. Dependent on `object_flags` */
  object_type_guid: string;
  /**Inherited Object GUID associated with ACL. Dependent on `object_flags` */
  inherited_object_type_guid: string;
}

/**
 * Metadata associated with Security Descriptor information
 */
export interface Descriptor {
  /**Control flags associated with the data */
  control_flags: string[];
  /**SACL info associated with the data */
  sacls: AccessControl[];
  /**DACL info associated with the data */
  dacls: AccessControl[];
  /**Owner SID associated with the data */
  owner_sid: string;
  /**Group SID associated with the data */
  group_sid: string;
}
