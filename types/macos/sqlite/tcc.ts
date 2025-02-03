import { SingleRequirement } from "../codesigning.ts";

export interface TccValues {
  db_path: string;
  data: TccData[];
}

export interface TccData {
  service: string;
  client: string;
  client_type: ClientType;
  auth_value: AuthValue;
  auth_reason: Reason;
  auth_version: number;
  cert: SingleRequirement | undefined;
  policy_id: number | null | undefined;
  indirect_object_identifier_type: number | undefined;
  indirect_object_identifier: string;
  indirect_object_code_identity: SingleRequirement | undefined;
  flags: number | undefined;
  last_modified: string;
  pid: number | null | undefined;
  pid_version: number | null | undefined;
  boot_uuid: string;
  last_reminded: string;
}

export enum Reason {
  Error = "Error",
  UserConsent = "UserConsent",
  UserSet = "UserSet",
  SystemSet = "SystemSet",
  ServicePolicy = "ServicePolicy",
  MDMPolicy = "MDMPolicy",
  OverridePolicy = "OverridePolicy",
  MissingUsageString = "MissingUsageString",
  PromptTimeout = "PromptTimeout",
  PreflightUnknown = "PreflightUnknown",
  Entitled = "Entitled",
  AppTypePolicy = "AppTypePolicy",
  Unknown = "Unknown",
}

export enum ClientType {
  BundleId = "BundleId",
  AbsolutePath = "AbsolutePath",
  Unknown = "Unknown",
}

export enum AuthValue {
  Denied = "Denied",
  Allowed = "Allowed",
  Limited = "Limited",
  Unknown = "Unknown",
}
