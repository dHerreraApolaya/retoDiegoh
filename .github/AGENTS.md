# Project Instructions

## Project Context

Build a production-grade mobile application using:

- React Native 0.85.
- TypeScript strict mode.
- React Native New Architecture.
- Android and iOS.
- Clean Architecture.
- Vertical Slicing by business capability.
- BIAN-inspired capability boundaries.
- Unit, integration, component, and E2E testing.

These rules apply to all generated and modified code.

## Communication

- Write code, comments, documentation, commit suggestions, and technical artifacts in English.
- Explain decisions to the user in the language used by the user.
- Keep responses concise.
- Do not repeat project rules unless relevant.
- Report assumptions, risks, and validations not executed.

## Core Principles

Apply:

- SOLID.
- KISS.
- DRY.
- YAGNI.
- Separation of Concerns.
- Dependency Inversion.
- Composition over inheritance.
- Explicit dependencies.
- Fail fast.
- Secure by default.
- Accessible by default.
- Testable by design.

Do not introduce abstractions without a concrete reason.

Do not remove duplication when duplicated code represents different business concepts or different reasons to change.

Prefer the simplest solution that preserves correctness, security, testability, and architectural boundaries.

## Architecture

Organize code by business capability, not by technical type.

```text
src/
├── app/
│   ├── bootstrap/
│   ├── navigation/
│   ├── providers/
│   └── configuration/
├── capabilities/
│   └── capability-name/
│       ├── presentation/
│       │   ├── screens/
│       │   ├── components/
│       │   ├── hooks/
│       │   ├── navigation/
│       │   └── view-models/
│       ├── application/
│       │   ├── use-cases/
│       │   ├── ports/
│       │   └── dto/
│       ├── domain/
│       │   ├── entities/
│       │   ├── value-objects/
│       │   ├── services/
│       │   ├── events/
│       │   └── errors/
│       ├── infrastructure/
│       │   ├── api/
│       │   ├── repositories/
│       │   ├── storage/
│       │   ├── native/
│       │   └── mappers/
│       ├── testing/
│       └── index.ts
├── shared/
│   ├── design-system/
│   ├── platform/
│   ├── security/
│   ├── observability/
│   ├── testing/
│   └── types/
└── native-specs/
```

Avoid global folders such as:

```text
src/components
src/hooks
src/services
src/repositories
src/utils
```

Use them only for truly shared concepts.

## Dependency Rules

Allowed dependencies:

```text
presentation -> application -> domain
infrastructure -> application
infrastructure -> domain
app -> capabilities
app -> shared
capability -> shared
```

Forbidden dependencies:

```text
domain -> React
domain -> React Native
domain -> infrastructure
domain -> navigation
application -> UI
shared -> capabilities
capability A -> internal files of capability B
```

Capabilities may communicate only through public contracts.

```ts
import { type CustomerSummary } from '@/capabilities/customer';
```

Do not deep-import another capability.

## Layer Responsibilities

### Domain

Contains business rules only:

- Entities.
- Value objects.
- Domain services.
- Domain events.
- Domain errors.
- Policies.
- Specifications.

The domain must not depend on frameworks.

### Application

Contains use cases and ports.

Use cases must:

- Represent one business action.
- Receive dependencies through interfaces.
- Return explicit typed results.
- Avoid React, navigation, storage, HTTP, and native APIs.

### Infrastructure

Contains implementations for:

- APIs.
- Storage.
- Analytics.
- Native modules.
- Third-party SDKs.
- Repositories.
- Mappers.

Translate external models into application or domain models.

### Presentation

Contains:

- Screens.
- UI components.
- Presentation hooks.
- View models.
- Capability navigation.

Do not place business rules, storage access, HTTP calls, or native integration details inside components.

## TypeScript

Use strict TypeScript.

Do not use:

- `any`.
- `@ts-ignore`.
- `@ts-nocheck`.
- Double casting.
- Numeric enums.
- Ambiguous optional parameters.
- Untyped external data.

Prefer:

- `unknown` plus validation.
- Readonly types.
- Discriminated unions.
- Exhaustive checks.
- Branded identifiers.
- Pure functions.
- Explicit return types for public APIs.

Example:

```ts
export type OperationResult<T> =
  | { readonly status: 'success'; readonly data: T }
  | { readonly status: 'failure'; readonly error: OperationError };
```

## Design Patterns

Use patterns only when they solve a real problem.

Recommended patterns:

- Repository for data access.
- Adapter for external systems.
- Mapper for model translation.
- Strategy for interchangeable behavior.
- Factory for complex creation.
- State Machine for explicit transitions.
- Specification for composable business rules.
- Observer for native or external events.
- Facade for capability public APIs.
- Result for expected failures.
- Dependency Injection for testability.
- Anti-Corruption Layer for third-party SDKs.

Avoid:

- Mutable global singletons.
- Service Locator.
- Generic CRUD repositories.
- God objects.
- Base components.
- Global untyped event buses.
- Generic `utils.ts`.
- Hooks combining UI, networking, analytics, navigation, and storage.

## React and React Native

### Components

Components must be:

- Small.
- Declarative.
- Accessible.
- Focused on presentation.
- Easy to test.
- Composed instead of inherited.

Avoid components with many boolean props. Prefer explicit variants or specialized components.

### State

Classify state before selecting a tool:

- Local UI state: `useState` or `useReducer`.
- Derived state: calculate during render.
- Server state: server-state library.
- Form state: form-specific solution.
- Session state: limited provider or store.
- Navigation state: navigator.
- Sensitive persisted state: secure storage adapter.

Do not duplicate server state in a global store.

Do not store values that can be derived.

### Hooks

Custom hooks must:

- Start with `use`.
- Have one responsibility.
- Expose a small API.
- Clean up subscriptions and asynchronous work.
- Hide infrastructure details.
- Be testable independently.

Do not create a hook when a pure function is enough.

### Effects

Use effects only to synchronize with external systems.

Valid cases:

- Subscriptions.
- Native listeners.
- Timers.
- Imperative APIs.
- Lifecycle analytics.
- External state synchronization.

Do not use effects to derive state or handle user actions.

### Memoization

Do not use `memo`, `useMemo`, or `useCallback` by default.

Use them only when:

- Referential stability is required.
- A measured expensive calculation exists.
- A frequently rendered list item benefits.
- Profiling confirms a render problem.

### Lists

Use `FlatList`, `SectionList`, or a justified optimized list implementation for dynamic collections.

Every list must provide:

- Stable keys.
- Loading state.
- Empty state.
- Error state.
- Retry behavior.
- Accessibility.
- Pagination when required.
- Stable test identifiers.

Never use array indexes as keys.

Keep row components lightweight.

## Native Integration

Use React Native New Architecture.

Prefer:

1. Existing React Native APIs.
2. Maintained New Architecture-compatible libraries.
3. Turbo Native Modules with Codegen.
4. Legacy modules only with documented justification.

Choose communication mechanisms as follows:

- Promise: one asynchronous result initiated by JavaScript.
- Event: repeated updates initiated by native code.
- Callback: only when required by an external API.
- Synchronous method: only for immediate, non-I/O, measured operations.

Requirements:

- Keep Android and iOS contracts equivalent.
- Do not block JS or UI threads.
- Return structured error codes.
- Remove listeners.
- Cancel pending operations.
- Release native resources during invalidation.
- Do not expose platform exceptions directly.
- Do not send secrets through events.

## Accessibility

All user-facing features must support VoiceOver and TalkBack.

Interactive elements must define:

- Accessible role.
- Accessible name.
- Accessible state when applicable.
- Adequate touch target.
- Logical focus order.
- Sufficient contrast.
- Dynamic text support.
- Understandable error messages.

Do not communicate meaning only through color, position, animation, or icons.

Manage focus when opening and closing modals.

Prefer semantic queries in component tests.

## Performance

Do not optimize by intuition.

Evaluate:

- Startup time.
- JS thread usage.
- UI thread usage.
- Render frequency.
- List virtualization.
- Image size.
- Memory usage.
- Native calls.
- Bundle size.
- Navigation latency.

Avoid heavy work during initial render.

Measure before and after non-trivial optimizations.

## Security

Classify data before storing, displaying, transmitting, or logging it.

Sensitive data includes:

- Tokens.
- PINs.
- Passwords.
- Keys.
- Banking information.
- Personal identifiers.
- Session data.
- Private API responses.

Rules:

- Store secrets only through a secure storage port.
- Use Keychain-backed storage on iOS.
- Use Keystore-backed storage on Android.
- Never use AsyncStorage for secrets.
- Clear session data on logout.
- Minimize persisted data.
- Never log sensitive values.
- Redact sensitive metadata.
- Protect sensitive screens from screenshots when required.
- Hide sensitive content in the app switcher.
- Recalculate session expiry after background transitions.
- Do not rely only on JavaScript intervals for security timeouts.
- Do not include private data in test IDs.
- Do not disable TLS validation.
- Validate all external data.

Use an injectable time provider for expiry and timeout logic.

## Error Handling

Do not ignore errors.

Do not use empty `catch` blocks.

Translate infrastructure errors into capability-specific errors.

Differentiate:

- Domain errors.
- Validation errors.
- Authentication errors.
- Connectivity errors.
- Native errors.
- Infrastructure errors.
- Unexpected errors.

Do not expose technical messages directly to users.

## Testing Strategy

Write code for testability.

Minimum expectations:

```text
Domain -> unit tests
Use cases -> unit tests
Services -> unit tests
Mappers -> unit tests
Hooks -> hook tests
Components -> component tests
Adapters -> integration tests
Native modules -> native tests and contract tests
Critical journeys -> E2E tests
```

Tests must verify behavior, not implementation details.

Do not test:

- Private functions.
- Internal hook calls.
- Internal state.
- Irrelevant markup structure.
- Render counts unless profiling behavior.

Test:

- Outputs.
- User interactions.
- Visible states.
- Contracts.
- Errors.
- External effects.
- Accessibility.
- Navigation outcomes.

Every bug fix requires a regression test.

## Test Naming

Use colocated tests.

```text
Card.ts
Card.test.ts

FreezeCard.ts
FreezeCard.test.ts

CardMapper.ts
CardMapper.test.ts

RemoteCardRepository.ts
RemoteCardRepository.integration.test.ts

useCardDetail.ts
useCardDetail.test.ts

CardItem.tsx
CardItem.test.tsx

CardDetailScreen.tsx
CardDetailScreen.test.tsx

card-freezing.e2e.ts
```

Test names must describe behavior.

```ts
describe('FreezeCard', () => {
  it('freezes an active card', async () => {});
  it('rejects an already frozen card', async () => {});
});
```

Use Arrange, Act, Assert.

Use explicit doubles:

- `Stub`.
- `Spy`.
- `Fake`.
- `Mock` only when necessary.

## Naming Conventions

Use:

```text
Screen: CardDetailScreen.tsx
Component: CardSummary.tsx
Hook: useCardDetail.ts
Use case: FreezeCard.ts
Domain service: SessionExpirationService.ts
Port: CardReader.ts
Adapter: HttpCardReader.ts
Repository: RemoteCardRepository.ts
Mapper: CardMapper.ts
DTO: CardResponseDto.ts
Entity: Card.ts
Value object: CardId.ts
Error: CardNotFoundError.ts
Domain event: CardFrozen.ts
Factory: CardFactory.ts
Strategy: AuthenticationStrategy.ts
Fixture: CardFixture.ts
Stub: CardRepositoryStub.ts
Spy: AnalyticsSpy.ts
Fake: SecureStorageFake.ts
Test IDs: CardDetailTestIds.ts
```

Use query verbs:

```text
get
find
search
list
read
observe
```

Use command verbs:

```text
create
update
delete
submit
confirm
cancel
activate
invalidate
```

Avoid vague names:

```text
handleData
processInfo
manageItem
doAction
helper
utils
common
manager
```

## Test IDs

Use semantic accessibility queries for component tests.

Use `testID` as a stable E2E contract.

Format:

```text
<capability>.<screen-or-flow>.<element>.<action-or-state>
```

Examples:

```text
authentication.login.email-input
authentication.login.password-input
authentication.login.submit-button
cards.card-list.list
cards.card-detail.freeze-button
cards.card-detail.error-message
```

Centralize IDs by screen or flow.

```ts
export const CardDetailTestIds = {
  screen: 'cards.card-detail.screen',
  freezeButton: 'cards.card-detail.freeze-button',
  errorMessage: 'cards.card-detail.error-message',
} as const;
```

For repeated items, use a stable non-sensitive public identifier.

Never include:

- Array indexes.
- Card numbers.
- Email addresses.
- Identity document numbers.
- Tokens.
- Private business identifiers.
- Translated text.

## Definition of Done

A change is complete only when:

- Business requirements are satisfied.
- Capability boundaries remain valid.
- No forbidden dependency is added.
- Security implications are reviewed.
- Accessibility is implemented.
- Loading, empty, error, and success states are handled.
- Unit tests are added or updated.
- Integration tests are added where required.
- E2E IDs are added for user flows.
- Critical E2E scenarios are updated.
- Listeners and resources are cleaned up.
- Typecheck passes.
- Lint passes.
- Relevant tests pass.
- No new warnings are introduced.
- Important architectural decisions are documented.

Do not claim validation passed unless it was executed.
