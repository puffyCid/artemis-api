export interface HomebrewReceipt extends HomebrewFormula {
  installedAsDependency: boolean;
  installedOnRequest: boolean;
  installTime: string;
  sourceModified: string;
  name: string;
}

export interface HomebrewFormula {
  description: string;
  homepage: string;
  url: string;
  license: string;
  caskName: string;
  formulaPath: string;
  version: string;
}

export interface HomebrewData {
  packages: HomebrewReceipt[];
  casks: HomebrewFormula[];
}
