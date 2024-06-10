---
sidebar_position: 3
---

# Adding a Feature

Before working on a new feature for artemis please make sure you have read the
[Contributing](https://github.com/puffycid/artemis/blob/main/CONTRIBUTING.md)
document. Most important thing is to first create an issue! Basic overview of
adding a new feature:

1. Create an issue. If you want to work on it, make sure to explicitly volunteer!
2. Create a branch on your clone artemis repo
3. Work on feature
4. Ensure tests are made for all functions
5. If you are adding a new artifact, add an integration test
6. Run `cargo clippy`.
7. Run `cargo fmt`
8. Open a pull request!

## Other Useful Development Tools

List of useful tools that could aid in development.

- [Unused Features](https://github.com/TimonPost/cargo-unused-features)
- [Audit](https://github.com/RustSec/rustsec/tree/main/cargo-audit)
- [Geiger](https://github.com/rust-secure-code/cargo-geiger)
- [scc](https://github.com/boyter/scc)
- [clippy](https://github.com/rust-lang/rust-clippy)
- [nextest](https://nexte.st/)
- [just](https://github.com/casey/just)
