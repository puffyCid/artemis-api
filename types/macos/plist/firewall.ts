import { Alias } from "../alias";
import { SingleRequirement } from "../codesigning";

/**
 * Represents the current status of the macOS Firewall
 */
export interface Firewall {
  allow_signed_enabled: boolean;
  firewall_unload: boolean;
  logging_enabled: boolean;
  global_state: boolean;
  logging_option: boolean;
  stealth_enabled: boolean;
  version: string;
  applications: FirewallApplication[];
  exceptions: FirewallExceptions[];
  explicit_auths: string[];
  services: Services[];
}

export interface FirewallExceptions {
  path: string;
  state: number;
}

export interface Services {
  name: string;
  allowed: boolean;
}

export interface FirewallApplication {
  code_signing: SingleRequirement;
  application_info: Alias;
  block_incoming: boolean;
}
