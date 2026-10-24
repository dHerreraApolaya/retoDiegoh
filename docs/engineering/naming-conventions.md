# Naming conventions

These are repository conventions, not filenames mandated by Clean Architecture.
Names communicate business intent, responsibility and boundaries. Keep one
canonical vocabulary across specs, TypeScript, Kotlin and Swift. Technical names
use English; functional specifications and user-facing explanations use Spanish.

## Paths and identifiers

| Element                                         | Convention                                                       | Example                                                  |
| ----------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------- |
| Capability and ordinary source directories      | kebab-case; capability is a business concept                     | cards, accounts, authentication, value-objects           |
| Type/class/component file                       | PascalCase; match the principal export                           | Card.ts, CardSummary.tsx                                 |
| Function-only module                            | camelCase; name the operation                                    | createCardsCapability.ts, mapCardResponse.ts             |
| Hook file and function                          | camelCase with use prefix                                        | useCardSummary.ts                                        |
| Native Codegen contract                         | Native prefix required by RN discovery                           | NativeCardSecureView.ts                                  |
| Repository script                               | kebab-case                                                       | check-doc-links.mjs                                      |
| Engineering Markdown                            | kebab-case, except conventional entry points                     | naming-conventions.md; README.md, AGENTS.md, SECURITY.md |
| Types, interfaces, classes and React components | PascalCase                                                       | CardId, CardReader, CardSummary                          |
| Variables, parameters, functions and methods    | camelCase; meaningful nouns or verbs                             | cardId, expiresAt, revealCardData                        |
| Boolean                                         | is/has/can/should plus a positive condition                      | isExpired, hasActiveSession, canReveal                   |
| Ordinary constants and token maps               | camelCase; use readonly/as const as appropriate                  | revealTimeoutMs, cardColors                              |
| Fixed protocol/error codes                      | UPPER_SNAKE_CASE string values                                   | TOKEN_EXPIRED, USER_DISMISS                              |
| Kotlin/Swift files and types                    | PascalCase                                                       | CardSecureViewModule.kt, RevealSession.swift             |
| Kotlin packages                                 | Lowercase reverse-domain segments; follow existing app namespace | com.retodiegoh.cards                                     |

Preserve framework-mandated filenames, native resource names and generated code
conventions. Do not rename App.tsx, index.js, Info.plist, AndroidManifest.xml or
Native Codegen symbols just for cosmetic uniformity. Do not add path aliases
unless TypeScript, Metro, Jest and lint resolve them consistently; aliases are
not currently configured.

Use Id, Api, Http, Dto and Url in composed names: CardId, HttpCardReader,
CardResponseDto. Preserve fixed platform names such as TurboModule. Use singular
entities and plural collections: Card, cards. Prefer specific words over
abbreviations: request, response, error instead of req, res, err in public APIs.
Conventional tiny loop variables are acceptable in a genuinely local scope.

## Layer vocabulary

| Responsibility          | Name/file example                                             | Rule                                                                         |
| ----------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Domain entity           | Card.ts                                                       | Business noun; avoid CardModel/CardEntity unless disambiguation is necessary |
| Value object            | CardId.ts, RevealDeadline.ts                                  | A meaningful invariant, not a wrapper for every primitive                    |
| Domain policy           | CardRevealPolicy.ts                                           | State the rule; a pure function is enough when no object is needed           |
| Domain event            | CardRevealed.ts                                               | Past-tense business fact                                                     |
| Domain error            | CardNotFoundError.ts                                          | Business failure, without transport/platform details                         |
| Application use case    | RevealCardData.ts                                             | Verb + business object; no redundant UseCase/Impl suffix                     |
| Function-based use case | revealCardData.ts                                             | Same responsibility; choose a function or class from the actual need         |
| Application port        | CardReader.ts, SecureCardView.ts                              | Consumer's required role, without I, Interface or Port prefixes/suffixes     |
| Repository port         | CardRepository.ts                                             | Only when collection/persistence semantics are needed; avoid generic CRUD    |
| Infrastructure adapter  | MockCardReader.ts, HttpCardReader.ts, NativeSecureCardView.ts | Name mechanism + implemented role                                            |
| Transport DTO           | CardResponseDto.ts                                            | Boundary-specific shape; do not expose it to presentation                    |
| Mapper                  | mapCardResponse.ts                                            | Source/purpose is clear; a stateless mapper does not need a class            |
| Screen                  | CardsDashboardScreen.tsx                                      | Routed view; Screen suffix                                                   |
| UI component            | CardSummary.tsx                                               | User-visible concept; no redundant Component suffix                          |
| Presentation hook       | useCardsDashboard.ts                                          | UI orchestration; no business/security authority hidden in hooks             |
| View state              | CardsDashboardState.ts                                        | UI state, distinct from server DTO or domain entity                          |
| Composition factory     | createCardsCapability.ts                                      | Wires dependencies; business rules remain outside the factory                |
| Test doubles            | CardReaderStub.ts, SecureCardViewSpy.ts, CardReaderFake.ts    | Name the role and actual double behavior                                     |

Avoid CardManager, BaseService, CommonUtils, DataHelper, processData and
CardRepositoryImpl. Replace them with the real responsibility. A Service suffix
needs a specific business responsibility; it is not a default layer or a place
to collect unrelated methods. Do not put React, Http or Native in domain names.

## Operations, errors and units

- Commands use a business verb: reveal, hide, freeze, renew, close, invalidate.
- Queries distinguish get (required value), find (explicitly nullable), list
  (collection), read (source/stream) and observe (subscription). Document outcomes.
- A returned Promise must be typed; Async suffix is unnecessary just to repeat it.
- Public handlers describe the event: onRevealRequested. Local UI callbacks may
  use handleRevealPress; handleData hides intent.
- Time and size names include units: revealTimeoutMs, expiresAtEpochSeconds,
  maxTokenLengthBytes. Never compare seconds with milliseconds implicitly.
- Error codes are stable and sanitized. Separate TOKEN_EXPIRED from an internal
  native exception and a translated user message. Do not concatenate secrets.
- Preserve incoming field names in boundary DTOs; map snake_case or third-party
  schemas to internal camelCase. Do not rename a public native contract silently.

## Tests, exports and Git

Colocate behavior tests: RevealCardData.test.ts, CardSummary.test.tsx and
HttpCardReader.integration.test.ts. Reserve kebab-case for journey files such as
secure-card-reveal.e2e.ts. Use descriptive scenarios: rejects an expired token.
Framework-native test targets retain their required names.

Use named exports for application code; default exports are allowed for required
entry points. A capability index.ts deliberately exposes its public contract;
do not create barrels in every folder or re-export all infrastructure internals.

Centralize non-sensitive E2E IDs by flow, for example CardsDashboardTestIds in
CardsDashboardTestIds.ts. Values use capability.flow.element, such as
cards.dashboard.reveal-button. Never encode PAN, tokens, personal data or indexes.

Branches use codex/<short-kebab-description> for agent work. Commits use
type(scope): imperative description, with an optional body describing rationale
and actual validation. This configuration baseline uses chore, not feat.

## Agent review

Before introducing a name, identify the business concept, owner, layer and unit.
Follow an existing precise term instead of creating a synonym. Review exported
names and contracts when behavior changes. Apply these conventions to new and
modified code; avoid unrelated repository-wide renames.

Enforcement is currently code review. Baseline ESLint does not enforce this
entire naming table; do not report naming compliance as an automated check.
