---
sidebar_position: 4
---

# Testing

artemis has a single basic guideline for testing:

- All functions should ideally have a test

For example, if you open a pull request to add a new feature and create three
new functions. Your should have a test for each new function (three tests
total).

:::tip

Its recommended to run in release mode for tests. This will greatly speed up the
tests. Tests should be run with root or Administrator privileges.

`just test or just nextest`

:::

:::warning

macOS and Linux users may need to increase the ulimit for open files.
`ulimit -n 1024`

:::

If you are unfamiliar with creating Rust tests. The Rust
[book](https://doc.rust-lang.org/book/ch11-03-test-organization.html) and
[Rust by example](https://doc.rust-lang.org/rust-by-example/testing/unit_testing.html)
have great learning resources.

## Integration Tests

If you are adding a new forensic artifact to artemis, including an integration
test for the artifact can also be very useful. Writing an integration is a two
(2) step process:

1. Create a TOML collection file. This should be TOML collection file that
   anyone could download and run themselves
2. Create a `artifact_tester.rs` file

An example `prefetch` integration test:

1. TOML file created at
   `<path to repo>/artemis-core/tests/test_data/windows/prefetch.toml`

```toml
system = "windows"

[output]
name = "prefetch_collection"
directory = "./tmp"
format = "json"
compress = false
endpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"
collection_id = 1
output = "local"

[[artifacts]]
artifact_name = "prefetch"
[artifacts.prefetch]
alt_drive = 'C'
```

2. `prefetch_tester.rs` created at
   `<path to repo>/artemis-core/tests/prefetch_tester.rs`

```rust
#[test]
#[cfg(target_os = "windows")]
fn test_prefetch_parser() {
    use std::path::PathBuf;

    use artemis_core::core::parse_toml_file;
    let mut test_location = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    test_location.push("tests/test_data/windows/prefetch.toml");

    let results = parse_toml_file(&test_location.display().to_string()).unwrap();
    assert_eq!(results, ())
}
```

Our `prefetch_tester.rs` file runs the `prefetch.toml` file through the whole
artemis program.

## Test Data

If you are adding a new forensic artifact to artemis, if you can include a
sample of the artifact that can be used for tests that would be very helpful.
Some things to keep in mind though:

- Size. If the artifact is large (10-20MB) then including the sample in the
  artemis repo is unnecessary.
- Licensing. If you can provide the artifact from your own system that is ideal.
  However, if you find the sample artifact in another GitHub repo make sure that
  repo's LICENSE is compatible with artemis.
