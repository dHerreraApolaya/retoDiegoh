# Card Secure View — retoDiegoh

React Native technical challenge: a masked account/card dashboard and a custom
native secure-card view, using synthetic data. The app has shared engineering checks, a TanStack Query provider and a minimal
Login/Home demo with a five-minute in-memory session. Real authentication, card
reveal and Firestore access remain future features.

## Start here

- [Contributing and setup](CONTRIBUTING.md): pinned tools, commands, hooks and PRs.
- [Engineering handbook](docs/README.md): architecture, naming, design, security and AI.
- [AGENTS.md](AGENTS.md): repository instructions for coding agents.
- [Functional specifications](specs/README.md).
- [TanStack/Firebase boundaries](docs/architecture/backend-integrations.md).
- [Security control evidence](docs/security/owasp-matrix.md).

## Shared stack

Node **24.22.1**, pnpm **10.34.8**, React **19.2.3**, React Native **0.87.1**,
TypeScript **6.0.3**, TanStack Query **5.104.5**, and React Native Firebase
App/Auth/Firestore **27.1.0**. package.json and pnpm-lock.yaml are authoritative.
The approved iO design reference has not been supplied; src/design/tokens is a
reserved future path, without empty placeholder files.

```sh
nvm install
nvm use
corepack enable
corepack prepare pnpm@10.34.8 --activate
pnpm install --frozen-lockfile
pnpm check
```

Use pnpm start, then pnpm android or pnpm ios in another terminal. Native setup
and lockfile requirements are in [CONTRIBUTING.md](CONTRIBUTING.md). Firebase
project files are supplied locally and remain excluded from the repository.

## Quality and security

Husky checks staged files/secrets before commit, Conventional Commit messages,
and the complete gate before push. CI repeats toolchain, docs, Prettier, ESLint,
types, tooling tests, Jest, tracked sensitive-file checks and masked secret scans
of source/reachable history. Production and development dependency advisories are checked online before
push, in CI and weekly once the workflow is on the default branch. Run
pnpm audit:dependencies; high/critical findings block the gate.
React Compiler handles automatic memoization, and ESLint validates hooks, effect
dependencies, immutability and compiler compatibility.
.editorconfig/.gitattributes and pinned Prettier keep formatting consistent.

Required GitHub checks/branch protection must still be configured by an owner.
Native device security and Firestore authorization tests are separate from JS
checks. See [quality gates](docs/engineering/quality-gates.md) for actual scope.

Mobile security uses OWASP Mobile Top 10 with MASVS/MASTG evidence planning.
Policies or passing scanners do not establish compliance or complete absence of
secrets. Report sensitive findings using [SECURITY.md](SECURITY.md).

Session/navigation behavior and BDD/TDD evidence: [session spec](specs/session/demo-access/spec.md).
Source organization follows [ADR-002](docs/architecture/decisions/ADR-002-screaming-feature-architecture.md).
