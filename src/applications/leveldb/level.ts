import { LevelDbEntry, LevelManifest, WalData } from "../../../types/applications/level";
import { FileError } from "../../filesystem/errors";
import { glob, readTextFile } from "../../filesystem/files";
import { PlatformType } from "../../system/systeminfo";
import { ApplicationError } from "../errors";
import { parseLdb } from "./table";
import { parseWal, parseWalManifest } from "./wal";

/**
 * A class to parse a directory containing Level database files
 */
export class LevelDb {
    private path: string;
    private platform: PlatformType;

    constructor (path: string, platform: PlatformType) {
        this.path = path;
        this.platform = platform;
    }

    /**
     * Determine the active manifest file for the level database
     * @returns Current manifest file
     */
    public current(): string | ApplicationError {
        let file = `${this.path}/CURRENT`;
        if (this.platform === PlatformType.Windows) {
            file = `${this.path}\\CURRENT`;
        }

        const text = readTextFile(file);
        if (text instanceof FileError) {
            return new ApplicationError(`LEVELDB`, `could not read ${file}: ${text}`);
        }

        return text.trim();
    }

    /**
     * Parse the LevelDb manifest
     * @returns Array of `LevelManifest` or `ApplicationError`
     */
    public manifest(): LevelManifest[] | ApplicationError {
        const target = this.current();
        if (target instanceof ApplicationError) {
            return target;
        }
        let file = `${this.path}/${target}`;
        if (this.platform === PlatformType.Windows) {
            file = `${this.path}\\${file}`;
        }
        return parseWalManifest(file);
    }

    /**
     * Parse the write ahead log for the level database
     * @returns Array of `WalData` or `ApplicationError`
     */
    public wal(): LevelDbEntry[] | ApplicationError {
        let logs = `${this.path}/*.log`;
        if (this.platform === PlatformType.Windows) {
            logs = `${this.path}\\*.log`;
        }

        const paths = glob(logs);
        if (paths instanceof FileError) {
            return new ApplicationError(`LEVELDB`, `could not glob for logs ${paths}`);
        }

        let values: LevelDbEntry[] = [];
        for (const path of paths) {
            if (!path.is_file) {
                continue;
            }

            const data = parseWal(path.full_path);
            if (data instanceof ApplicationError) {
                console.warn(`Failed to parse ${path.full_path}: ${data}`);
                continue;
            }
            values = values.concat(data);
        }

        return values;
    }

    /**
     * Parse all of the level database tables
     * @returns Array of `LevelDbEntry` or `ApplicationError`
     */
    public tables(): LevelDbEntry[] | ApplicationError {
        let logs = `${this.path}/*.ldb`;
        if (this.platform === PlatformType.Windows) {
            logs = `${this.path}\\*.ldb`;
        }

        const paths = glob(logs);
        if (paths instanceof FileError) {
            return new ApplicationError(`LEVELDB`, `could not glob for ldb ${paths}`);
        }

        let values: LevelDbEntry[] = [];
        for (const path of paths) {
            if (!path.is_file) {
                continue;
            }
            console.log(path.full_path);

            const data = parseLdb(path.full_path);
            if (data instanceof ApplicationError) {
                console.warn(`Failed to parse ${path.full_path}: ${data}`);
                continue;
            }
            values = values.concat(data);
        }
        return values;
    }
}