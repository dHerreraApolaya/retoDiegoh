# Screaming architecture and feature boundaries

## Decision

Organize code around named business features, following the user-confirmed
structure in [ADR-002](decisions/ADR-002-screaming-feature-architecture.md).
This supersedes ADR-001 paths, while preserving Clean Architecture dependency
direction, SOLID/KISS/DRY and minimal layers.

```text
src/
  app/                       Bootstrap composition and cross-feature coordination
    providers/               Query cache, session and app lifecycle wiring
  modules/
    features/
      authentication/        Login presentation for local demo access
      session/               In-memory five-minute session policy and public API
        domain/
        application/
        presentation/
        index.ts
      home/                  Home presentation; no authentication policy
    __tests__/
      session/               Session rules and real Login/Home integration
  navigation/                Typed root navigator, public/private route groups
  design/components/         Actually reused accessible UI primitives
```

Create domain/application/infrastructure/presentation only when the feature has
that responsibility. No empty layers or generic CRUD bases. Each feature has a
small deliberate index.ts; external consumers may not deep-import its internals.
Do not introduce a second feature tree under capabilities. Existing app/bootstrap
tests may stay in their app-level locations; feature tests belong to
`src/modules/__tests__/<feature>`. Native tests stay with their platform targets.

## Dependency boundaries

| Area           | Allowed dependencies                          | Forbidden dependencies                               |
| -------------- | --------------------------------------------- | ---------------------------------------------------- |
| domain         | Own domain and framework-free value contracts | React, RN, SDKs, app, navigation, UI                 |
| application    | Domain and required abstract ports            | Concrete SDK/storage/native/UI implementations       |
| infrastructure | Owned ports, domain, platform SDKs            | Presentation, app composition                        |
| presentation   | Application contracts, own domain, design     | Concrete Firebase/storage/native adapters            |
| navigation     | Public feature APIs and navigation libraries  | Domain policy, credentials in route parameters       |
| app            | Public feature APIs and runtime integrations  | Hidden service locators or duplicated business rules |

A dependency between features requires a narrow public contract, an explicit
owner and no cycle. Prefer app-level orchestration when two features would
otherwise depend on each other. Never expose concrete adapters or credentials
through a barrel merely to make the import public.

## Cross-feature ownership

- Session owns session lifetime and state. Authentication/Home receive actions;
  they do not know each other's screens or route names.
- AppProviders owns composition of the session with query cleanup, one AppState
  subscription and expiry scheduling. Features do not directly clear each
  other's state or import the QueryClient singleton; no singleton is introduced.
- Navigation derives the available route group from the public session state.
  Signing in/out does not manually navigate or retain the previous route group.
- Design components own actually reused UI primitives. Reserve src/design/tokens
  for real token values; do not claim approved iO brand parity for interim UI.
- Add a framework-free shared contract only when multiple features really need
  it. A future modules/shared area must not become a bag of business rules,
  SDK integrations or globally mutable services. No empty shared area is created.

## Secure-card boundary

The future cards feature owns reveal use cases and a SecureCardView port. Its
native adapter wraps Codegen; native independently validates reveal grants and
owns full synthetic PAN/CVV, timers and sensitive rendering. JS receives masked
summaries and lifecycle metadata only. See [secure development](../security/secure-development.md).
The demo session is not real authentication and grants no production authorization.

## References and enforcement

[Bluesky navigation](https://github.com/bluesky-social/social-app/blob/main/src/Navigation.tsx)
separates routing from a session-state API; [Mattermost products](https://github.com/mattermost/mattermost-mobile/tree/main/app/products)
show product-owned modules. These are references for responsibilities, not proof
that either project uses this exact tree or prescribes our layers.

[React Navigation auth flows](https://reactnavigation.org/docs/auth-flow/)
support conditionally available routes without manually navigating on auth
changes. This app uses one native stack with public/private groups for its two
routes; extra nested stacks would add no behavior yet.

Import boundaries are currently reviewed manually; full graph/cycle enforcement
is not implemented. Typecheck/lint cannot by themselves prove architecture.
