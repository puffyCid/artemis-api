export interface Wifi {
  name: string;
  security: string;
  hidden: boolean;
  roaming_profile: string;
  add_reason: string;
  added_at: string;
  auto_join: boolean;
  personal_hotspot: boolean;
  joined_by_user_at: string;
  last_discovered: string;
  updated_at: string;
}

export interface WifiPlist {
  AddReason: string;
  AddedAt: string;
  Hidden: boolean;
  LastDiscoveredAt: string;
  AutoJoinDisabled: boolean;
  JoinedByUserAt: string;
  PersonalHotspot: boolean | undefined;
  SupportedSecurityTypes: string;
  UpdatedAt: string;
  "__OSSpecific__": {
    RoamingProfileType: string;
  };
}
