export interface AppMetadata {
  gameCenterEnabled: boolean;
  genre: string;
  itemId: number;
  "com.apple.iTunesStore.downloadInfo": {
    purchaseData: string;
    accountInfo: {
      AltDSID: string;
      AppleID: string;
      DSPersonID: number;
      DownloaderID: number;
      FamilyId: number;
      PurchaserID: number;
    };
  };
  distributorInfo: {
    localizedDistributorName: {
      "": string;
    };
    distributorID: string;
    developerName: string;
  };
  storeCohort: string;
  /**YYYY-MM-DDTHH:mm:ssZ */
  releaseDate: string;
  softwareVersionExternalIdentifier: number;
  "is-purchased-redownload": boolean;
  hasOrEverHasHadIAP: boolean;
  isB2BCustomApp: boolean;
  launchProhibited: boolean;
  /**Developer Name */
  artistName: string;
  isFactoryInstall: boolean;
  subgenres: unknown[];
  storefrontCountryCode: string;
  variantID: string;
  DeviceBasedVPP: boolean;
  sideLoadedDeviceBasedVPP: boolean;
  kind: string;
  s: number;
  "is-auto-download": boolean;
  hasMessagesExtension: boolean;
  /**App version */
  bundleShortVersionString: string;
  genreId: number;
  /**The app where the app came from */
  sourceApp: string;
  "iad-attribution": string;
  "redownload-params": string;
  softwareVersionBundleId: string;
  /**App name (What shows up in Springboard/UI) */
  title: string;
  gameCenterEverEnabled: string;
  /**App full title name */
  itemName: string;
  rating: {
    /**Age group */
    label: string;
    rank: number;
  };
  bundleVersion: string;
}
