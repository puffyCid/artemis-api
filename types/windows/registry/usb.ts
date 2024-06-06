/**
 * USB forensics actually is pretty complex. More research needs to be done to determine what information is available.
 * References:
 * - https://www.sans.org/blog/the-truth-about-usb-device-serial-numbers/
 */

export interface UsbDevices {
  device_class_id: string;
  friendly_name: string;
  /**Last drive letter assigned to the USB */
  drive_letter: string;
  last_connected: string;
  /**This is in local time */
  first_connected: string;
  volume_serial: string;
  last_insertion: string;
  last_removal: string;
  usb_type: string;
  vendor: string;
  product: string;
  revision: string;
  tracking_id: string;
  disk_id: string;
}
