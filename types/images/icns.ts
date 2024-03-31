export interface Icon {
  /**Size in pixels. Ex: 128x128 */
  size: number;
  /**Base64 encoded */
  image: string;
}

export enum OSType {
  icon = "ICON",
  icn = "ICN#",
  icm = "icm#",
  icm4 = "icm4",
  icm8 = "icm8",
  ics = "ics#",
  ics4 = "ics4",
  ics8 = "ics8",
  is32 = "is32",
  s8mk = "s8mk",
  icl4 = "icl4",
  icl8 = "icl8",
  il32 = "il32",
  l8mk = "l8mk",
  ich = "ich#",
  ich4 = "ich4",
  ich8 = "ich8",
  ih32 = "ih32",
  h8mk = "h8mk",
  it32 = "it32",
  t8mk = "t8mk",
  icp4 = "icp4",
  icp5 = "icp5",
  icp6 = "icp6",
  ic07 = "ic07",
  ic08 = "ic08",
  ic09 = "ic09",
  ic10 = "ic10",
  ic11 = "ic11",
  ic12 = "ic12",
  ic13 = "ic13",
  ic14 = "ic14",
  ic04 = "ic04",
  ic05 = "ic05",
  icsb = "icsb",
  icsB = "icsB",
  sb24 = "sb24",
  SB24 = "SB24",
  /**Contains a binary plist */
  info = "info",
  toc = "TOC ",
  icnV = "icnV",
  name = "name",
  sbtp = "sbtp",
  slct = "slct",
}
