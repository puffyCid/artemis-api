---
description: How to make custom parsers
---

# Nom APIs

Artemis uses the [nom](https://github.com/rust-bakery/nom) Rust library to parse
data on the system. Only some of the nom API is exposed to JavaScript runtime.
In addition, several nom helper functions are exposed to assist with common
parsing tasks.

Nom is a powerful parsing framework but can be a little complex when first
starting. It works on both plaintext and binary data. Artemis mainly uses it for
binary data. But parts of the artemis-api will support plaintext as well.

An highlevel overview of the way nom works:

1. You give nom X bytes and tell nom to "eat" (nom) Y bytes
2. Nom wil consume Y bytes then return Y bytes AND the **remaining** X bytes

So if you give nom 10 bytes and tell it eat/consume 2 bytes. You would get 2
bytes and 8 bytes returned. Pseudo-code below

```
let input  = [0,1,2,3,4,5,6,7,8,9]; // 10 bytes
let take = 2;

let remaining, consumed = nom(input, take)

assert!(remaining.len(), 8); // We consumed 2 bytes, we have 8 remaining
assert!(remaining, [2,3,4,5,6,7,8,9]); // our remaining bytes!
assert!(consumed, [0,1]); // we consumed the first 2 bytes!
```

:::warning

Using nom might add additional overhead to your script. Everytime you nom
artemis needs to seend JS data to Rust code. If your JS script is slow, try
parsing the raw bytes using only JS (ex: .slice())

An example can be found in macOS BOM parser. It uses both nom and native JS to
parse some data.

:::

### nomUnsignedFourBytes(data, endianess) -> NomUnsigned | NomError

Nom helper to parse four bytes into unsigned 32 bit integer

| Param     | Type       | Description             |
| --------- | ---------- | ----------------------- |
| data      | Uint8Array | Bytes to provide to nom |
| endianess | Endian     | Endian type of data     |

### nomUnsignedEightBytes(data, endianess) -> NomUnsigned | NomError

Nom helper to parse eight bytes into unsigned 64 bit integer

| Param     | Type       | Description             |
| --------- | ---------- | ----------------------- |
| data      | Uint8Array | Bytes to provide to nom |
| endianess | Endian     | Endian type of data     |

### nomUnsignedTwoBytes(data, endianess) -> NomUnsigned | NomError

Nom helper to parse two bytes into unsigned 16 bit integer

| Param     | Type       | Description             |
| --------- | ---------- | ----------------------- |
| data      | Uint8Array | Bytes to provide to nom |
| endianess | Endian     | Endian type of data     |

### nomUnsignedOneBytes(data, endianess) -> NomUnsigned | NomError

Nom helper to parse one bytes into unsigned 8 bit integer

| Param     | Type       | Description             |
| --------- | ---------- | ----------------------- |
| data      | Uint8Array | Bytes to provide to nom |
| endianess | Endian     | Endian type of data     |

### nomUnsignedSixteenBytes(data, endianess) -> NomUnsignedLarge | NomError

Nom helper to parse sixteen bytes into unsigned 128 bit integer as a string

| Param     | Type       | Description             |
| --------- | ---------- | ----------------------- |
| data      | Uint8Array | Bytes to provide to nom |
| endianess | Endian     | Endian type of data     |

### nomSignedFourBytes(data, endianess) -> NomSigned | NomError

Nom helper to parse four bytes into signed 32 bit integer

| Param     | Type       | Description             |
| --------- | ---------- | ----------------------- |
| data      | Uint8Array | Bytes to provide to nom |
| endianess | Endian     | Endian type of data     |

### nomSignedEightBytes(data, endianess) -> NomSigned | NomError

Nom helper to parse eight bytes into signed 64 bit integer

| Param     | Type       | Description             |
| --------- | ---------- | ----------------------- |
| data      | Uint8Array | Bytes to provide to nom |
| endianess | Endian     | Endian type of data     |

### nomSignedTwoBytes(data, endianess) -> NomSigned | NomError

Nom helper to parse two bytes into signed 16 bit integer

| Param     | Type       | Description             |
| --------- | ---------- | ----------------------- |
| data      | Uint8Array | Bytes to provide to nom |
| endianess | Endian     | Endian type of data     |

### take(data, input) -> Nom | NomError

Nom provided string or bytes based on input length. This function exposes the
nom [take](https://docs.rs/nom/latest/nom/bytes/complete/fn.take.html) function.

| Param | Type                 | Description                                     |
| ----- | -------------------- | ----------------------------------------------- |
| data  | string OR Uint8Array | String or bytes to provide to nom               |
| input | number               | How many bytes or characters nom should consume |

```typescript
function main() {
  let test = "Hello TypeScript!";
  let len = "Hello".length;
  let nom_data: Nom | NomError = take(test, len);
  if (nom_data instanceof NomError) {
    console.error(`Error when parsing data ${nom_data}`);
    return nom_data;
  }

  // We nommed ("consumed") the length of `hello`
  console.assert(nom_data.nommed, "Hello");
  // We stil have some string data remaining
  console.assert(nom_data.remaining, " TypeScript!");
}
```

Pseudo-code below for practical example

```typescript
let data = read_file("file.bin");
// Now have bytes of a file. The file is in Little Endian format

// First four bytes are the file signature
let sig = nomUnsignedFourBytes(data, endian.LE);
if (sig instanceof NomError) {
  return sig;
}

// Our nom function consumed and converted the first 4 bytes to unsigned integer
console.log(sig.value);

// Next 2 bytes are length of UTF8 string. Our sig object contains the remaining bytes
let string_len = nomUnsignedTwoBytes(sig.remaining, endian.LE);
if (string_len instanceof NomError) {
  return string_len;
}

// string_len now contains the length of the string that is next
// Take the length of the string
let string_data = take(string_len.remaining, string_len.value);
if (string_data instanceof NomError) {
  return string_data;
}

// Extract the string from the raw bytes we consumed
let string_value = extractUt8String(string_data.nommed);

console.log(string_value);

// Continue parsing remaining bytes with string_data.remaining
```

### takeUntil(data, input) -> Nom | NomError

Nom data **until** provided input. This function exposes the nom
[take_until](https://docs.rs/nom/latest/nom/bytes/complete/fn.take_until.html)
function. If the `input` does not exist, you will get an error.

| Param | Type                 | Description                                     |
| ----- | -------------------- | ----------------------------------------------- |
| data  | string OR Uint8Array | String or bytes to provide to nom               |
| input | string OR Uint8Array | Nom data until input. Must be same type as data |

Psuedo-code example below:

```typescript
function main() {
  /** Here we have a very complex artifact. With lots of flags and extra data.
   * We are only interested in some data.
   * Luckily the data we want has signatures we can scan for
   */
  const data = read_file("complexArtifact.bin");

  let first_sig = [1, 23, 33, 56];
  const first_data = takeUntil(data, first_sig);
  if (first_data instanceof NomError) {
    console.error(`Got error searching for first_data ${first_data}`);
    return first_data;
  }

  // Now we have arrived at first_data sig. We dont care about anything we consumed to get here
  // We have **NOT** consumed the signature yet!
  const sig = nomUnsignedFourBytes(first_data.remaining, Endian.Le);
  // Could technically skip this since, `takUntil` has guaranteed that we have 4 bytes remaining. Since we searched for `[1, 23, 33, 56]`
  if (sig instanceof NomError) {
    return sig;
  }

  // Now lets get FILETIME timestamp
  const time_data = nomUnsignedEightBytes(sig.remaining, Endian.Le);
  if (time_data instanceof NomError) {
    return time_data;
  }

  // Convert FILETIME unsigned 64 bit value to unixepoch seconds
  let unix_time = filetimeToUnixEpoch(time_data.value);
  const pretty_data = new Date(unix_time * 1000);
  const utcString = pretty_data.toUtcString();
  console.log(`${utcString}`);

  const second_sig = [83, 134, 54, 99];
  const second_data = takeUntil(time_data.remaining, second_sig);
  // Repeat same process above
}
```

### takeWhile(data, input) -> Nom | NomError

Nom data while data **IS** equal to input. This function exposes the nom
[take_while](https://docs.rs/nom/latest/nom/bytes/complete/fn.take_while.html)
function.

| Param | Type                 | Description                                                                                                    |
| ----- | -------------------- | -------------------------------------------------------------------------------------------------------------- |
| data  | string OR Uint8Array | String or bytes to provide to nom                                                                              |
| input | string OR number     | Nom data until input. Must be single character if data is string or a number (&lt;= 255) if data is Uint8Array |

Psuedo-code example below:

```typescript
function main() {
  // This file has an unknown amount of padding we have to deal with
  const data = read_file("complexFile.bin");

  const sig = nomUnsignedTwoBytes(data, Endian.Be);
  if (sig instanceof NomError) {
    return sig;
  }

  // The next interesting piece of the file we want is a timestamp.
  // But after the sig there is an unknown amount of zero padding we need to consume
  // We **cannot** use `takeUntil` because our timestamp bytes can be anything

  const pad = 0;
  const padding_data = takeWhile(sig.remaining, pad);
  if (padding_data instanceof NomError) {
    return padding_data;
  }

  // Our complex file uses both Big and Little Endian!
  const time_data = nomUnsignedEightBytes(padding_data.remaining, Endian.Le);
  const time = filetimeToUnixEpoch(time_data.value);
  console.lot(time);

  const unknown_data = nomUnsignedFourBytes(time_data.remaining, Endian.Be);
  // Continue parsing the file
}
```
