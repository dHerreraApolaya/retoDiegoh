# Toolchain migration validation

Validated locally on 2026-10-23, branch feature/rules-to-dev, based on
codex/initial-guidelines. These results supersede the environment gaps recorded
in the historical baseline report; they do not certify mobile security controls.

## Results

| Check                     | Observed result                                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Pinned Node/pnpm          | Node 24.22.1 / pnpm 10.34.8 accepted; drift and other package managers rejected in tests                                              |
| Frozen offline install    | Passed using pnpm-lock.yaml and the populated temporary store                                                                         |
| pnpm check                | Toolchain, local docs, Prettier, ESLint with zero warnings, strict types, tests, sensitive paths, source/history secret checks passed |
| Tooling regression tests  | 12 tests: toolchain/secrets/index checks plus real Babel compiler output and hook dependency/immutability/state regressions           |
| Jest                      | 3 suites / 3 tests passed: provider focus, cache cleanup/isolation and starter rendering                                              |
| Complete dependency audit | pnpm audit --audit-level high returned zero findings across production and development dependencies after compiler installation       |
| Commitlint                | Accepted a Conventional Commit and rejected an invalid message using temporary message files                                          |
| Husky                     | Local core.hooksPath is .husky/_; prepare installs hooks outside CI                                                                   |
| YAML/diff                 | Workflow/Dependabot/workspace YAML parsed; git diff --check passed                                                                    |
| Android native            | assembleDebug with arm64-v8a, SDK 37, Gradle 9.4.1, Kotlin 2.4.21 and JDK 21 completed; APK generated                                 |
| iOS native                | CocoaPods update completed; generic iOS Simulator Debug build without signing exited 0 under Xcode 27.1                               |
| Metro                     | Android production JS bundle completed using Metro 0.87.1                                                                             |

Native lockfiles and Swift Package.resolved are generated, not hand-edited.
Test-generated private keys are temporary fixtures with no service/account
access. No real Firebase project configuration was supplied.

## Limits and remaining work

- The Mac reports an older CoreSimulator/CoreDevice framework than Xcode expects.
  Generic compilation succeeded; simulator launch/device execution was not
  validated. Repair the local simulator installation before runtime QA.
- Native dependencies emit deprecation, nullability/umbrella and related warnings.
  Metro reports a React Native private feature-flag resolution fallback. These
  are recorded, not suppressed or described as warning-free native builds.
- ESLint 9 is the RN preset's accepted major; npm flags it deprecated. A future
  preset/tooling upgrade must support the next major before changing it. Review
  the scoped Flow and gRPC overrides and remove them when upstream permits.
- Dependency install scripts remain denied. An ignored-build warning is not
  permission to execute a package script.
- The follow-up request authorized the complete dependency audit. The results
  above cover the final JavaScript lockfile, including development packages;
  CocoaPods, SwiftPM and Gradle advisories are not covered by pnpm audit.
- No Firebase login, Firestore access, emulator authorization tests, real-device
  security tests, release signing or deployment was performed.
- CI is configured but has not run remotely for this unpublished branch. Required
  checks and PR protection still need repository-owner configuration.

See [contributing](../../CONTRIBUTING.md) for repeatable commands and
[quality gates](quality-gates.md) for the scope of each check.
