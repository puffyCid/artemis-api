import { querySqlite } from "../../../mod";
import { ManifestDomainStats } from "../../../types/ios/itunes/manifest";
import { ApplicationError } from "../../applications/errors";
import { IosError } from "../error";

/**
 * Function to determine the number of domains in the `Manifest.db file.
 * Excludes `AppDomainPlugins` and `AppDomainGroups`
 * @param path Path to iTunes backup directory
 * @returns Array of `ManifestDomainStats` or `IosError`
 */
export function queryDomains(path: string): ManifestDomainStats[] | IosError {
  const db_path = `${path}/Manifest.db`;
  const query = `SELECT 
                    domain, 
                    count(domain) as count
                FROM 
                    Files 
                WHERE 
                    domain NOT LIKE '%DomainPlugin%' 
                    AND domain NOT LIKE '%DomainGroup%' 
                GROUP BY 
                    domain`;
  const results = querySqlite(db_path, query);
  if (results instanceof ApplicationError) {
    return new IosError(
      `MANIFEST_DB`,
      `could not get domains in Manifest.db: ${results}`,
    );
  }
  const domains = results as unknown as ManifestDomainStats[];
  for (let i = 0; i < domains.length; i++) {
    domains[i].namespace = domains[i].domain.replace("AppDomain-", "");
  }

  return domains;
}
