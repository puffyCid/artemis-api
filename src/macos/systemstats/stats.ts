import { extractUtf8String } from "../../encoding/strings";
import { formatGuid } from "../../encoding/uuid";
import { FileError } from "../../filesystem/errors";
import { readFile } from "../../filesystem/files";
import { NomError } from "../../nom/error";
import { Endian, nomUnsignedFourBytes, nomUnsignedOneBytes, nomUnsignedTwoBytes } from "../../nom/helpers";
import { take } from "../../nom/parsers";
import { MacosError } from "../errors";

export function parseStats(path: string): boolean | MacosError {
    const bytes = readFile(path);
    if(bytes instanceof FileError) {
        return new MacosError(`SYSTEMSTATS`, `failed to read file ${path}: ${bytes}`);
    }

    const remaining = parseHeader(bytes);
    if(remaining instanceof MacosError) {
        return new MacosError(`SYSTEMSTATS`, `failed to parse header ${path}: ${remaining}`);
    }
   // parseChunk(remaining)
    return false;
}

interface Header {
    sig: number;
    remaining: Uint8Array;
}

function parseHeader(bytes: Uint8Array): Header | MacosError{
    const sig = nomUnsignedTwoBytes(bytes, Endian.Le);
    if(sig instanceof NomError) {
        return new MacosError(`SYSTEMSTATS`, `failed to nom header sig: ${bytes}`);
    }

    const unknown = nomUnsignedOneBytes(sig.remaining);
    if(unknown instanceof NomError) {
        return new MacosError(`SYSTEMSTATS`, `failed to nom unknown: ${unknown}`);
    }

    const version_len = nomUnsignedOneBytes(unknown.remaining);
    if(version_len instanceof NomError) {
        return new MacosError(`SYSTEMSTATS`, `failed to nom version len: ${version_len}`);
    }

    const version_bytes = take(version_len.remaining, version_len.value);
    if(version_bytes instanceof NomError) {
        return new MacosError(`SYSTEMSTATS`, `failed to nom version: ${version_bytes}`);
    }

    const version = extractUtf8String(version_bytes.nommed as Uint8Array);
    //console.log(`Stats version: ${version}`);

    const absolute = nomUnsignedFourBytes(version_bytes.remaining as Uint8Array, Endian.Le);
    if(absolute instanceof NomError) {
        return new MacosError(`SYSTEMSTATS`, `failed to nom absolute?: ${absolute}`);
    }

    const bit_set = 1 << 31;
    const is_upper_set = absolute.value & bit_set;

    let remaining = absolute.remaining;
    // Have an extra byte?
    if (is_upper_set != 0) {
        const unknown = nomUnsignedOneBytes(remaining);
        if(unknown instanceof NomError) {
            return new MacosError(`SYSTEMSTATS`, `failed to nom extra byte?: ${unknown}`);
        }
        remaining = unknown.remaining;
    }

    const wall_time = nomUnsignedFourBytes(remaining, Endian.Le);
    if(wall_time instanceof NomError) {
        return new MacosError(`SYSTEMSTATS`, `failed to nom wall time?: ${wall_time}`);
    }

    const wall_time_upper = nomUnsignedTwoBytes(wall_time.remaining, Endian.Le);
    if(wall_time_upper instanceof NomError) {
        return new MacosError(`SYSTEMSTATS`, `failed to nom wall time upper?: ${wall_time_upper}`);
    }

    console.log(`Wall: ${wall_time.value} - Upper: ${wall_time_upper.value}`);
    console.log(`Bitwise: ${wall_time_upper.value * Math.pow(2, 32)}`)
    const continous_time = BigInt(wall_time.value) | BigInt((wall_time_upper.value * Math.pow(2, 32)));
    console.log(`Continous time: ${continous_time}`);
    console.log(`Absolute: ${absolute.value}`);

    const denomenator = nomUnsignedOneBytes(wall_time_upper.remaining);
    if(denomenator instanceof NomError) {
        return new MacosError(`SYSTEMSTATS`, `failed to nom timebase denomenator?: ${denomenator}`);
    }

    const numerator = nomUnsignedOneBytes(denomenator.remaining);
    if(numerator instanceof NomError) {
        return new MacosError(`SYSTEMSTATS`, `failed to nom timebase numerator?: ${numerator}`);
    }

    console.log(`Denom: ${denomenator.value}/${numerator.value} = ${denomenator.value/numerator.value}`)

    const flag = nomUnsignedOneBytes(numerator.remaining);
    if(flag instanceof NomError) {
        return new MacosError(`SYSTEMSTATS`, `failed to nom flag?: ${flag}`);
    }

    console.log(`Flag might be writer for boot?: ${flag.value}`);

    const uuid_type = nomUnsignedOneBytes(flag.remaining);
    if(uuid_type instanceof NomError) {
        return new MacosError(`SYSTEMSTATS`, `failed to nom uuid type?: ${uuid_type}`);
    }

    let boot = "";
    if (uuid_type.value === 0x2a) {
        const uuid_size = nomUnsignedOneBytes(uuid_type.remaining);
        if(uuid_size instanceof NomError) {
            return new MacosError(`SYSTEMSTATS`, `failed to nom uuid size: ${uuid_size}`);
        }
        
        const uuid_bytes = take(uuid_size.remaining, uuid_size.value);
        if(uuid_bytes instanceof NomError) {
            return new MacosError(`SYSTEMSTATS`, `failed to nom uuid bytes: ${uuid_bytes}`);
        }

        const uuid = formatGuid(Endian.Be, uuid_bytes.nommed as Uint8Array);
        boot = uuid;
        console.log(`Current boot UUID: ${uuid}`);
        remaining = uuid_bytes.remaining as Uint8Array;
    } else if (uuid_type.value === 0x3a) {
        const uuid_size = nomUnsignedOneBytes(uuid_type.remaining);
        if(uuid_size instanceof NomError) {
            return new MacosError(`SYSTEMSTATS`, `failed to nom uuid size: ${uuid_size}`);
        }
        
        const uuid_bytes = take(uuid_size.remaining, uuid_size.value);
        if(uuid_bytes instanceof NomError) {
            return new MacosError(`SYSTEMSTATS`, `failed to nom uuid bytes: ${uuid_bytes}`);
        }

        const uuid = formatGuid(Endian.Be, uuid_bytes.nommed as Uint8Array);
        console.log(`Last boot UUID: ${uuid}`);
        boot = uuid;
        remaining = uuid_bytes.remaining as Uint8Array;
    }

    const unknown4 = nomUnsignedOneBytes(remaining as Uint8Array);
    if(unknown4 instanceof NomError) {
        return new MacosError(`SYSTEMSTATS`, `failed to nom unknown4 flag again?: ${unknown4}`);
    }

    console.log(`Len?: ${unknown4.value}`);

    const release_version_len = nomUnsignedOneBytes(unknown4.remaining);
    if(release_version_len instanceof NomError) {
        return new MacosError(`SYSTEMSTATS`, `failed to nom release_version_len: ${release_version_len}`);
    }

    const release_bytes = take(release_version_len.remaining, release_version_len.value);
    if(release_bytes instanceof NomError) {
        return new MacosError(`SYSTEMSTATS`, `failed to nom release_bytes: ${release_bytes}`);
    }

    const release = extractUtf8String(release_bytes.nommed as Uint8Array);
    console.log(`Release version: ${release}`)

    const head: Header = {
        sig: sig.value,
        remaining: release_bytes.remaining as Uint8Array,
    };
    return head;
}

function parseChunk(bytes: Header): Uint8Array | MacosError {
    let is_b8 = 14434;
    let remaining = bytes.remaining;
    console.log(bytes.sig);
    if(bytes.sig === is_b8) {
        const unknown = nomUnsignedTwoBytes(remaining, Endian.Le);
        if(unknown instanceof NomError) {
            return new MacosError(`SYSTEMSTATS`, `failed to parse unknown b8 data: ${unknown}`);
        }
        remaining = unknown.remaining;

        console.log(`Got b8 value before chunk?: ${unknown.value.toString(16)}`);
    }
    const chunk = nomUnsignedTwoBytes(remaining, Endian.Le);
    if(chunk instanceof NomError) {
        return new MacosError(`SYSTEMSTATS`, `failed to parse chunk: ${chunk}`);
    }

    console.log(`Chunk?: ${chunk.value.toString(16)}: remaining ${chunk.remaining.buffer.byteLength}`);

    const chunk_size = nomUnsignedOneBytes(chunk.remaining);
    if(chunk_size instanceof NomError) {
        return new MacosError(`SYSTEMSTATS`, `failed to parse chunk size: ${chunk_size}`);
    }

    console.log(`Size: ${chunk_size.value}`);

    return chunk.remaining;
}