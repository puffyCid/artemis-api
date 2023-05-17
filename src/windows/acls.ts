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
