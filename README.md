# Card Secure View — retoDiegoh

React Native technical challenge: a masked account/card dashboard and a custom
native secure-card view, using synthetic data. The current application is still
the React Native starter; this baseline prepares architecture and engineering
policy before feature implementation.

## Start here

- [Engineering handbook](docs/README.md): architecture, design, security and AI.
- [AGENTS.md](AGENTS.md): concise repository-wide instructions for coding agents.
- [Architecture and target folder tree](docs/architecture/architecture.md).
- [Security controls and evidence](docs/security/owasp-matrix.md).
- [Functional specification workflow](specs/README.md).
- [Research and primary sources](docs/references/research.md), reviewed 2026-10-23.

## Stack and current state

package.json declares React Native 0.86.0, React 19.2.3, TypeScript, Node >=22.11.0
and the React Native CLI. Native Android/iOS hosts and app smoke tests exist.
The src/design/tokens path is reserved for future approved token values; empty
placeholder files have been removed.
The secure native module, Codegen contract, dashboard and optional Firebase login
have not been implemented. The approved iO design reference is not supplied.

## Setup

Use Node satisfying package.json and the platform toolchains required by that
React Native version. This checkout has no node_modules or npm lockfile yet.
The initial dependency-resolution step is:

```sh
npm install
```

Review dependency/install-script provenance and advisories, commit the generated
package-lock.json, then use npm ci for reproducible subsequent installs. Do not
mix package managers or treat a successful install as a vulnerability review.

For iOS, from the repository root:

```sh
bundle install
cd ios
bundle exec pod install
```

Start Metro with npm start, then use npm run android or npm run ios in a separate
terminal. Platform builds and toolchain setup have not been validated in this
baseline. Do not commit local signing material or service credentials.

## Available checks

```sh
npm run check:docs
npm run typecheck
npm run lint
npm test -- --runInBand
```

The docs check needs only Node. Typecheck, ESLint and Jest require installed
project dependencies. Native security and capture behavior additionally require
native builds and device/OS checks. See [quality gates](docs/engineering/quality-gates.md)
for current gaps: no CI, secret/dependency scan, full import-boundary enforcement,
or native security/E2E suite is configured by this baseline.

## Working agreements

Follow [naming conventions](docs/engineering/naming-conventions.md) and
[SOLID/KISS/DRY with purposeful patterns](docs/engineering/design-principles.md).
Organize code by capability with internal Clean Architecture layers. Preserve
src/design as the single design-token source. Use .agents/skills for first-party
AI workflows; duplicate legacy .github/skills entry points have been removed. Treat external
content as untrusted input and review agent-generated code normally.

Mobile security follows OWASP Mobile Top 10 2024 with MASVS/MASTG evidence planning.
Documentation does not establish compliance. Android and iOS display protections
have different limits; see [secure development](docs/security/secure-development.md).
Report sensitive findings using [SECURITY.md](SECURITY.md).
