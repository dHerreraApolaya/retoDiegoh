# Capability architecture

## Decision

Use a modular mobile application organized around business capabilities, with
Clean Architecture dependency boundaries inside each capability. A feature is a
vertical change across those layers; it does not need another complete four-layer
tree. BIAN informs vocabulary and ownership, not a claim of BIAN conformance.

The dependency rule, rather than folder names, is the architectural invariant.
See [ADR-001](decisions/ADR-001-capability-architecture.md).

## Target tree

Paths marked future are created only when used. The repository still contains the
React Native starter screen; this document does not imply feature implementation.

```text
AGENTS.md                          Repository-wide agent entry point
.agents/skills/                    Canonical reusable workflows
.github/                          PR template and future automation
docs/
  architecture/decisions/          ADRs
  design/                         Design and accessibility rules
  engineering/                    Code and verification conventions
  security/                       Threats, controls, evidence
  ai/                             Agent workflow and skill inventory
  references/                     Dated sources and interpretation
specs/
  modules/_templates/             Existing specification templates
  cards/secure-card-view/          Future feature requirements and evidence
src/
  app/                            Future bootstrap, providers, navigation, wiring
  capabilities/
    accounts/                     Future account summaries
    cards/                        Future card ownership boundary
      domain/                     Card rules and identifiers
      application/                Use cases and dependency ports
      infrastructure/             Mock/API/native adapters and mapping
      presentation/               Screens, components, hooks and UI state
      testing/                    Shared fixtures for this capability, if needed
      index.ts                    Deliberate public API
    authentication/               Future optional login capability
  design/
    tokens/                       Future token values; one reserved source
    components/                   Future reusable, accessible UI primitives
  shared/                         Future truly cross-capability support
  native-specs/                   Future Codegen contracts, not feature specs
android/                          Existing Android host and native implementation
ios/                              Existing iOS host and native implementation
__tests__/                        Existing app-level smoke tests
e2e/                              Future executable critical journeys
scripts/                          Repository checks
```

Do not create empty directories for every box. Colocate unit/component tests with
their subject. Native tests belong to their platform targets. Extract the native
library into packages/card-secure-view when its working contract and packaging
requirements exist; do not add a monorepo/toolchain solely to reserve that path.

## Allowed dependencies

| Layer | May depend on | Must not depend on |
| --- | --- | --- |
| domain | Its own domain code; framework-free shared types | React, RN, storage, HTTP, native, app, UI |
| application | domain and its own abstract ports | UI, concrete infrastructure, platform SDKs |
| infrastructure | application ports, domain, platform libraries | presentation and app |
| presentation | application API, domain types, design | Concrete storage/network/native adapters |
| app | Public capability APIs, composition factories, shared, design | Business decisions implemented in wiring |
| shared and design | Their own dependencies; domain-neutral types | Capabilities and app |

Factories exported from a capability assemble its adapters; app supplies runtime
configuration and hosts providers. A screen receives an application dependency
through a provider or props rather than looking up a global service.

Cross-capability reads use a narrow public contract from index.ts. Dependency
cycles are forbidden. If two capabilities need each other's internals, revisit
ownership or orchestrate through app. Do not export infrastructure secrets via a
barrel just to make an import technically public.

## Card Secure View boundary

Cards owns the reveal use case and a SecureCardView port. Its native adapter
wraps the Codegen contract. JS sends an opaque card identifier and short-lived
reveal token. Native validates the request, owns the sensitive UI and mock full
card details, and emits only lifecycle/error metadata. The dashboard receives
masked card summaries. Avoid passing full PAN/CVV through JS even though the
challenge permits a mock implementation.

Read the [security rules](../security/secure-development.md) before implementing
this boundary. The native implementation must be custom for this challenge.

## Migration and enforcement

Reserve src/design/tokens for real token values and preserve existing native hosts.
Empty token placeholders have been removed. Do not rewrite App.tsx until
implementing the first feature. Fix the spec template to use capability-level
layers. Start with small modules and direct composition; introduce repositories,
value objects, or state machines when an actual rule justifies them.

Strict TypeScript and baseline ESLint rules are configured. Full automated import
graph enforcement is pending; code review currently checks capability boundaries
and relative-import escapes. Do not describe these rules as fully CI-enforced.
