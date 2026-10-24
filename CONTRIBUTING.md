# Contributing

## Shared toolchain

Use Node **24.22.1** and pnpm **10.34.8**, declared in package.json, .nvmrc and
.node-version. Install/use the pinned Node through your version manager, then
activate the pinned pnpm version:

```sh
nvm install
nvm use
corepack enable
corepack prepare pnpm@10.34.8 --activate
pnpm install --frozen-lockfile
pnpm check
```

If your Node distribution has no Corepack, install the exact pnpm version using
your normal trusted package-manager setup. Do not run unreviewed install scripts.
The preinstall guard rejects other Node/package-manager versions and competing
npm/yarn lockfiles. The only JS dependency lockfile is pnpm-lock.yaml.

Exact pins make local/CI results comparable; they do not freeze maintenance.
Upgrade pins and lockfile together through reviewed PRs. Dependabot proposes
weekly dependency/action updates; React Native and Firebase packages are grouped.
Do not disable engine or peer checks to make an update install.

## Daily checks

```sh
pnpm format           # Explicitly apply the shared format
pnpm format:check     # Read-only format validation
pnpm lint             # No ESLint warnings accepted
pnpm typecheck
pnpm test:tooling
pnpm test:ci
pnpm check            # Complete offline quality gate, including secrets
pnpm audit:dependencies # Online scan: production and development dependencies
```

.editorconfig and .gitattributes normalize whitespace and line endings. Prettier
is the formatting authority for supported project-owned files. Generated native
metadata, dependency lockfiles and vendored third-party skills are excluded from
rewrites. Native language formatters and device tests remain separate work.

## Git hooks and PRs

Husky installs local hooks during pnpm install:

- pre-commit: toolchain, staged lint/format validation, docs, tracked sensitive
  paths and masked content scanning of the actual Git index plus working source. It does not silently rewrite staged files.
- commit-msg: Conventional Commits, such as chore(tooling): align shared checks.
- pre-push: pnpm check, including reachable Git history scans, followed by
  pnpm audit:dependencies. The audit requires registry access and fails on
  high/critical findings or registry errors.

Hooks can be bypassed locally, so CI repeats the full gate with a frozen lockfile
and scans production/development advisories. The same workflow runs weekly
and on manual dispatch once present on the default branch. The Quality workflow uses read-only repository
permissions and reviewed action SHAs. No production/Firebase credentials are
provided to PR jobs. Configure the **Quality gates** required check and PR review
in GitHub branch protection; adding the workflow alone does not enforce merging.
Repository settings have not been changed by this work.

Use small branches and PRs with meaningful descriptions, actual validation and
the explicit secrets checklist. Naming, SOLID/KISS/DRY, architecture and data
handling remain required even when automated checks pass. See
[AGENTS.md](AGENTS.md) and the [handbook](docs/README.md).

## Native setup

React Native 0.87.1 aligns with the official template: Android SDK/build-tools 37,
Gradle 9.4.1 (the RN plugin selects AGP), with Kotlin 2.4.21 for Firebase Auth
metadata compatibility. The RN template itself defaults to Kotlin 2.2.0. JDK 21 is the project
validation baseline. Android release signing must be configured separately; debug
credentials are never used to sign release builds.

iOS uses CocoaPods for React Native and dynamic framework linkage for
RNFirebase 27's Firebase Apple SDK/SPM integration. This is not RN's experimental
full SwiftPM migration. Use a Ruby version compatible with the Gemfile lock and
installed CocoaPods tooling, then update pods for this migration:

```sh
bundle install
cd ios
bundle exec pod update
```

Review and commit the regenerated Podfile.lock before declaring iOS reproducible.
Do not hand-edit native lockfile versions. Native build status and environment
gaps must be reported separately from JS tests.

Firebase project configuration and access-rule testing are described in
[backend integrations](docs/architecture/backend-integrations.md).
