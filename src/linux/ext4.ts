import { FileEntry } from "../../types/linux/ext4";
import { LinuxError } from "./errors";

/**
 * Function to read a file by accessing the raw `EXT4` filesystem.
 * It currently reads the whole file into memory!
 * Use with **CAUTION**
 * @param path Path to file you want to read
 * @param device The device associated with the ext4 filesystem. Ex: /dev/sda1
 * @returns Bytes read or `LinuxError`
 */
export function readRawFileExt4(path: string, device: string): Uint8Array | LinuxError {
    try {
        // @ts-expect-error: Custom Artemis function
        const data: Uint8Array = js_read_raw_file_ext4(path, device);
        return data;
    } catch (err) {
        return new LinuxError("EXT4", `failed to read file ${path}: ${err}`);
    }
}

/**
 * Function to search for directories and files. This is similar to globbing, except you can use regex.
 * All entries are stored in memory! Use with **CAUTION**  
 * No bytes are read, but it will store any regex match in memory
 * @param path Path you want to read. This can be a valid Rust regex string
 * @param start Start path you want to start reading at
 * @param device The device associated with the ext4 filesystem. Ex: /dev/sda1
 * @returns Array of `FileEntry` or `LinuxError`
 */
export function readRawDirExt4(path: string, start: string, device: string): FileEntry[] | LinuxError {
    try {
        // @ts-expect-error: Custom Artemis function
        const data: FileEntry[] = js_read_raw_dir_ext4(path, start, device);
        return data;
    } catch (err) {
        return new LinuxError("EXT4", `failed to read path ${path}: ${err}`);
    }
}

/**
 * Function to read a file by its inode by accessing the raw `EXT4` filesystem.
 * It currently reads the whole file into memory!
 * Use with **CAUTION**
 * @param inode Inode number to read. Must be a positive number
 * @param device The device associated with the ext4 filesystem. Ex: /dev/sda1
 * @returns Bytes read or `LinuxError`
 */
export function readRawInodeExt4(inode: number, device: string): Uint8Array | LinuxError {
    if (inode <= 0) {
        return new LinuxError(`EXT4`, `You provided a bizarre inode number? It must be greater than 0`);
    }
    try {
        // @ts-expect-error: Custom Artemis function
        const data: Uint8Array = js_read_raw_inode_ext4(inode, device);
        return data;
    } catch (err) {
        return new LinuxError("EXT4", `failed to read inode ${inode}: ${err}`);
    }
}