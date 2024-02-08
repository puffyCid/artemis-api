/**
 * Very simple interface to handle responses from VT
 */
export interface VTResponse {
  /**URL associated with response */
  url: string;
  /**Status code for response */
  status: number;
  /**Body of the response. If 200 status code; will contain `VTData`. Otherwise will contain non-200 response */
  body: VTError | VTData;
}

interface VTError {
  error: {
    code: string;
    message: string;
  };
}

export interface VTData {
  data: {
    attributes: VTFile | VTDomain | VTIP;
    id: string;
    links: Record<string, string>;
    type: string;
    /**Other attributes based on file types such as PDF; APK; deb; etc */
    [key: string]: unknown;
  };
}

/**
 * File Object https://developers.virustotal.com/reference/files
 */
export interface VTFile {
  capabilities_tags: string[];
  creation_date: number;
  crowdsourced_ids_results: {
    alert_context: {
      dest_ip: string;
      dest_port: number;
      hostname: string;
      protocol: string;
      src_ip: string;
      src_port: string;
      url: string;
    }[];
    alert_severity: string;
    rule_category: string;
    rule_id: string;
    rule_msg: string;
    rule_source: string;
  }[];
  crowdsourced_ids_stats: {
    info: number;
    high: number;
    low: number;
    medium: number;
  };
  crowdsourced_yara_results: {
    description: string;
    match_in_subfile: boolean;
    rule_name: string;
    ruleset_name: string;
    source: string;
  }[];
  downloadable: boolean;
  first_submission_date: number;
  last_analysis_date: number;
  last_analysis_results: Record<string, Analysis>;
  last_analysis_stats: {
    "confirmed-timeout": number;
    failure: number;
    harmless: number;
    malicious: number;
    suspicious: number;
    timeout: number;
    "type-unsupported": number;
    undetected: number;
  };
  last_modification_date: number;
  last_submission_date: number;
  md5: string;
  meaningful_name: string;
  names: string[];
  reputation: number;
  sandbox_verdicts: Record<string, Sandbox>;
  sha1: string;
  sha256: string;
  sigma_analysis_results: {
    rule_title: string;
    rule_source: string;
    match_context: {
      values: Record<string, string>;
    }[];
    rule_level: string;
    rule_description: string;
    rule_author: string;
    rule_id: string;
  }[];
  sigma_analysis_stats: {
    critical: number;
    high: number;
    low: number;
    medium: number;
  };
  sigma_analysis_summary: Record<string, SigmaRule>;
  size: number;
  tags: string[];
  times_submitted: number;
  total_votes: {
    harmless: number;
    malicious: number;
  };
  type_description: string;
  type_extension: string;
  type_tag: string;
  unique_sources: number;
  vhash: string;

  // Optional results below
  ssdeep?: string;
  trid?: {
    file_type: string;
    probability: number;
  }[];
  /** Info https://developers.virustotal.com/reference/signature_info */
  signature_info?: {
    signers: string;
    signers_details: {
      algorithm: string;
      "cert issuer": string;
      name: string;
      "serial number": string;
      status: string;
      thumbprint: string;
      "valid from": string;
      "valid to": string;
      "valid usage": string;
    }[];
    verified: string;
    Authority?: string;
    CDHash?: string;
    CMSDigest?: string;
    CMSDigestType?: string;
    "CandidateCDHash sha256"?: string;
    "CandidateCDHashFull sha256"?: string;
    Format?: string;
    Identifier?: string;
    "Info.plist"?: string;
    "Page size"?: string;
    "Signature size"?: string;
    TeamIdentifier?: string;
    Timestamp?: string;
    comments?: string;
    copyright?: string;
    "counter signers"?: string;
    "counter signers details"?: {
      algorithm: string;
      "cert issuer": string;
      name: string;
      "serial number": string;
      status: string;
      thumbprint: string;
      "valid from": string;
      "valid to": string;
      "valid usage": string;
    }[];
    description?: string;
    "file version"?: string;
    "internal name"?: string;
    "original name"?: string;
    product?: string;
    "signing date"?: string;
    x509: {
      algorithm: string;
      "cert issuer": string;
      name: string;
      "serial number": string;
      thumbprint: string;
      "valid from": string;
      "valid to": string;
      "valid usage": string;
    }[];
    "Executable Segment base"?: string;
    "Executable Segment limit"?: string;
    "Hash choices"?: string;
    VersionPlatform?: string;
    VersionSDK?: string;
    [key: string]: unknown;
  };
  known_distributors?: {
    filenames: string[];
    products: string[];
    distributors: string[];
    links: string[];
    data_sources: string[];
  };
  magic?: string;
  /** Info https://developers.virustotal.com/reference/macho_info */
  macho_info?: {
    libs: string[];
    info: {
      sha256: string;
      filename: string;
    };
    headers: {
      cpu_subtype: string;
      magic: string;
      size_cmds: number;
      file_type: string;
      num_cmds: number;
      flags: string[];
      cpu_type: string;
    };
    commands: {
      "type": string;
    }[];
    segments: {
      name: string;
      fileoff: string;
      vmsize: string;
      filesize: string;
      vmaddr: string;
      sections?: {
        type: string;
        flags: string[];
        name: string;
      };
    }[];
  };
  /** Info https://developers.virustotal.com/reference/pe_info */
  pe_info?: {
    debug: {
      codeview: {
        age: number;
        guid: string;
        name: string;
        offset: number;
        signature: string;
        timestamp: string;
      };
      fpo: {
        functions: number;
      };
      misc: {
        datatype: number;
        length: number;
        unicode: number;
        data: string;
        reserved: string;
      };
      offset: number;
      reserved10: {
        value: string;
      };
      size: number;
      timedatestamp: string;
      type: number;
      type_str: string;
    }[];
    entry_point: number;
    exports: string[];
    imphash: string;
    import_list: {
      imported_functions: string[];
      library_name: string;
    }[];
    machine_type: number;
    overlay: {
      chi2: number;
      filetype: string;
      entropy: number;
      offest: number;
      md5: string;
      size: number;
    };
    resource_details: {
      chi2: number;
      filetype: string;
      entropy: number;
      lang: string;
      sha256: string;
      type: number;
    }[];
    resourc_langs: Record<string, number>;
    resource_types: Record<string, number>;
    sections: {
      entropy: number;
      md5: string;
      name: string;
      raw_size: number;
      virtual_address: number;
      virtual_size: number;
    }[];
    timestamp: number;
  };
  /** Info https://developers.virustotal.com/reference/elf_info */
  elf_info?: {
    export_list: {
      name: string;
      type: string;
    }[];
    header: {
      type: string;
      hdr_version: string;
      num_prog_headers: number;
      os_abi: string;
      obj_version: string;
      machine: string;
      entrypoint: number;
      num_section_headers: number;
      abi_version: 0;
      data: string;
      class: string;
    };
    import_list: {
      name: string;
      type: string;
    }[];
    packers: string[];
    section_list: {
      name: string;
      virtual_address: number;
      flags: string;
      physical_offset: number;
      section_type: string;
      size: number;
    }[];
    segment_list: {
      segment_type: string;
      resources: string[];
    }[];
    shared_libraries: string[];
  };
}

/**
 * Domain Object https://developers.virustotal.com/reference/domain-info
 */
export interface VTDomain {
  categories: Record<string, string>;
  creation_date: number;
  favicon: {
    dhash: string;
    raw_md5: string;
  };
  jarm: string;
  last_analysis_date: number;
  last_analysis_results: {
    [key: string]: {
      category: string;
      engine_name: string;
      method: string;
      result: string;
    };
  };
  last_analysis_stats: {
    harmless: number;
    malicious: number;
    suspicious: number;
    timeout: number;
    undetected: number;
  };
  last_dns_records: {
    expire: number;
    flag: number;
    minimum: number;
    priority: number;
    refresh: number;
    rname: string;
    retry: string;
    serial: number;
    tag: string;
    ttl: number;
    type: string;
    value: string;
  }[];
  last_dns_records_date: number;
  last_https_certificate: Ssl;
  last_https_certificate_date: number;
  last_modification_date: number;
  last_update_date: number;
  popularity_ranks: {
    [key: string]: {
      rank: number;
      timestamp: string;
    };
  };
  registrar: string;
  reputation: number;
  tags: string[];
  total_votes: {
    harmless: number;
    malicious: number;
  };
  whois: string;
  whois_date: number;
  [key: string]: unknown;
}

/**
 * IP Object https://developers.virustotal.com/reference/ip-object
 */
export interface VTIP {
  as_owner: string;
  asn: number;
  continent: string;
  country: string;
  jarm: string;
  last_analysis_date: number;
  last_analysis_results: {
    [key: string]: {
      category: string;
      engine_name: string;
      method: string;
      result: string;
    };
  };
  last_analysis_stats: {
    harmless: number;
    malicious: number;
    suspicious: number;
    timeout: number;
    undetected: number;
  };
  last_modification_date: number;
  network: string;
  regional_internet_registry: string;
  reputation: number;
  total_votes: {
    harmless: number;
    malicious: number;
  };
  tags: string[];
  whois: string;
  whois_date: string;
  [key: string]: unknown;
}

interface Analysis {
  category: string;
  engine_name: string;
  engine_update: string;
  engine_version: string;
  method: string;
  result: string;
}

interface Sandbox {
  category: string;
  confidence: number;
  malware_classification: string[];
  malware_names: string[];
  sandbox_name: string;
}

interface SigmaRule {
  critical: number;
  high: number;
  low: number;
  medium: number;
}

interface Ssl {
  cert_signature: {
    signature: string;
    signature_algorithm: string;
  };
  extensions: {
    CA: boolean;
    authority_key_identifier: {
      keyid: string;
      serial_number: string;
    };
    ca_information_access: Record<string, string>;
    certificate_policies: string[];
    cert_template_name_dc: string;
    crl_distribution_points: string[];
    extended_key_usage: string[];
    key_usage: string[];
    netscape_cert_comment: string;
    netscape_certificate: boolean;
    old_authority_key_identifier: boolean;
    pe_logotype: boolean;
    subject_alternative_name: string[];
    subject_key_identifier: string;
    tags: string[];
    [key: string]: unknown;
  };
  first_seen_date: number;
  issuer: {
    C: string;
    CN: string;
    L: string;
    O: string;
    OU: string;
    ST: string;
  };
  public_key: {
    algorithm: string;
    rsa: {
      key_size: number;
      modulus: string;
      exponent: string;
    };
    dsa: {
      p: string;
      q: string;
      g: string;
      pub: string;
    };
    ec: {
      oid: string;
      pub: string;
    };
  };
  serial_number: string;
  signature_algorithm: string;
  size: number;
  subject: {
    C: string;
    CN: string;
    L: string;
    O: string;
    OU: string;
    ST: string;
  };
  thumbprint: string;
  thumbprint_sha256: string;
  validity: {
    not_after: string;
    not_before: string;
  };
  version: string;
}
