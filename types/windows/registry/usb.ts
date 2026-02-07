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
  last_insertion: string;
  last_removal: string;
  install: string;
  first_install: string;
  usb_type: string;
  vendor: string;
  product: string;
  revision: string;
  tracking_id: string;
  disk_id: string;
  message: string;
  datetime: string;
  timestamp_desc: "USB Last Connected";
  artifact: "Windows USB Device";
  data_type: "windows:registry:usb:entry";
}
