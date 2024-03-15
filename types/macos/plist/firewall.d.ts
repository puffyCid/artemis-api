import { Alias } from "../alias.ts";
import { SingleRequirement } from "../codesigning.ts";

/**
 * Represents the current status of the macOS Firewall
 */
interface Firewall {
  allow_signed_enabled: boolean;
  firewall_unload: boolean;
  logging_enabled: boolean;
  global_state: boolean;
  logging_option: boolean;
  stealth_enabled: boolean;
  version: string;
  applications: FirewallApplication[];
  exceptions: FirewallExceptions[];
  explict_auths: string[];
  services: Services[];
}

interface FirewallExceptions {
  path: string;
  state: number;
}

interface Services {
  name: string;
  allowed: boolean;
}

interface FirewallApplication {
  code_signing: SingleRequirement;
  application_info: Alias;
  block_incoming: boolean;
}
