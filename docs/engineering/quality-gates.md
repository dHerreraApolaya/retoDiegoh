# Quality gates

Use the pinned Node/pnpm toolchain and frozen pnpm lockfile. Setup and contributor
commands are in [CONTRIBUTING.md](../../CONTRIBUTING.md).

## Implemented gates

| Gate                  | Command                    | Scope                                                                                            |
| --------------------- | -------------------------- | ------------------------------------------------------------------------------------------------ |
| Toolchain             | pnpm check:toolchain       | Exact Node/pnpm, consistent pins, no competing JS lockfiles                                      |
| Documentation         | pnpm check:docs            | Local Markdown targets in project-owned guides, specs and skills                                 |
| Formatting            | pnpm format:check          | Shared Prettier configuration; explicit generated/vendor exclusions                              |
| Lint                  | pnpm lint                  | RN, TanStack and React Compiler/hook rules; zero warnings, no unsafe dynamic code or raw console |
| Types                 | pnpm typecheck             | Strict TypeScript and RN 0.87 public API                                                         |
| Tooling tests         | pnpm test:tooling          | Toolchain drift, sensitive paths/keys, actual Babel compilation and hook-rule regressions        |
| App tests             | pnpm test:ci               | Jest behavior tests and coverage reporting; no arbitrary percentage quota                        |
| Sensitive paths       | pnpm check:sensitive-files | Tracked credential files, including force-added ignored files                                    |
| Content secrets       | pnpm check:secrets         | Masked Secretlint rules for current project files                                                |
| History secrets       | pnpm check:secrets:history | Masked scan of reachable Git patch history, excluding the public debug keystore                  |
| Dependency advisories | pnpm audit:dependencies    | Online registry check of production and development packages; high/critical findings fail        |

The pre-commit hook additionally runs pnpm check:secrets:staged against the Git
index, so unstaged edits cannot hide a staged credential. History scans normalize
Git patch markers before content detection.

pnpm check runs all offline gates. CI installs with --frozen-lockfile, fetches full
history, runs the gate and checks all dependency advisories. Pre-push also runs
the online audit. Registry errors fail rather than being ignored. The workflow
runs weekly and on manual dispatch once merged into the default branch.
Actions are SHA-pinned,
permissions read-only, and no service secrets are passed to PR jobs. Dependabot
proposes weekly grouped package and GitHub Action updates.

Review all reported severities and upstream fixes. High/critical findings block
the online gate; lower severities still require triage in the PR. Do not use
blanket advisory ignores or force breaking upgrades. Recheck scoped overrides
when updating dependencies. Audits detect known registry advisories, not all
supply-chain attacks, and do not scan CocoaPods/SwiftPM/Gradle packages.

Hooks are convenience, not a security boundary: they can be disabled. GitHub
branch protection and required **Quality gates** status must be enabled by an
owner; this work does not change account/repository settings.

## Required review and further evidence

Every PR follows the [secrets gate](../security/secure-development.md), including
manual inspection of final diff/introduced commits and separate scanner evidence.
A scan cannot detect all possible secrets, a file-path gate cannot classify every
arbitrary filename, and available local history may omit remote/unfetched refs.

Require proportional checks in addition to the automated gate:

| Change                    | Additional evidence                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| Business behavior         | Requirement-linked failure/success and regression tests                                    |
| Growing data / hot paths  | Input bounds, time/auxiliary-space analysis and realistic profiling for performance claims |
| Native contract/lifecycle | Codegen/build, native tests and actual lifecycle behavior                                  |
| Sensitive display         | Supported device/OS screenshots, recording, background and timeout checks                  |
| UI                        | Design provenance, VoiceOver/TalkBack, focus and large text                                |
| Firebase access           | Local project setup, deny-by-default rules, emulator authorization tests                   |
| Release/build             | Native artifact, signing, permissions and networking configuration inspection              |

Full import-graph/cycle enforcement, native-language formatting, native/device
security suites and Firebase emulator tests remain future work. Native build
results are distinct from passing JS checks; report environment gaps explicitly.
No verified OWASP control is inferred from a tooling-only check.

Algorithmic complexity is a manual design/review criterion described in
[coding standards](coding-standards.md#algorithmic-complexity-and-resource-bounds).
Passing lint, React Compiler diagnostics or a cyclomatic-complexity metric does
not establish acceptable time/space complexity or device performance.

BDD/TDD evidence and resilient selectors follow [testing standards](coding-standards.md#behavioral-verification).
ESLint rejects Jest snapshot matchers; review still checks outcome-focused assertions
and E2E ID/accessibility quality. Passing lint alone does not establish test quality.
