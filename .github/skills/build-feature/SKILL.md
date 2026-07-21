---

name: build-feature
description: Build or modify an end-to-end React Native business capability using Vertical Slicing, Clean Architecture, secure defaults, accessibility, and automated testing.

---

# Build Feature

Use this skill when creating or modifying a user-facing business capability.

Follow `AGENTS.md`.

## Workflow

### 1. Understand the Capability

Identify:

- Business capability.
- User outcome.
- Business rules.
- Inputs and outputs.
- Failure scenarios.
- Security classification.
- Accessibility requirements.
- Native dependencies.
- E2E journey.

Do not start from screens or API responses. Start from business behavior.

### 2. Define the Vertical Slice

Place the feature under:

```text
src/capabilities/<capability-name>/
```

Create only the layers required by the feature.

Expected direction:

```text
presentation -> application -> domain
infrastructure -> application/domain
```

Avoid empty layers and placeholder abstractions.

### 3. Model the Domain

Create domain objects only when they protect business meaning or invariants.

Use:

- Entities for identity and lifecycle.
- Value objects for validated concepts.
- Domain services for rules spanning multiple objects.
- Domain errors for expected business failures.
- Domain events for meaningful business outcomes.

Keep the domain framework-independent.

### 4. Define the Use Case

A use case must represent one business action.

Example:

```ts
export interface FreezeCardInput {
  readonly cardId: CardId;
}

export type FreezeCardResult =
  | { readonly status: 'success'; readonly card: Card }
  | { readonly status: 'already-frozen' }
  | { readonly status: 'failure'; readonly error: FreezeCardError };
```

Inject all external dependencies through ports.

### 5. Implement Infrastructure

Create adapters for:

- APIs.
- Storage.
- Analytics.
- Native modules.
- Third-party SDKs.

Validate external data.

Map external models into domain or application models.

Do not leak API DTOs into presentation.

### 6. Build Presentation

Use:

```text
Screen
  -> presentation hook or view model
    -> use case
      -> port
        -> adapter
```

Components must not access infrastructure directly.

Handle:

- Loading.
- Empty state.
- Error.
- Success.
- Retry.
- Disabled state.
- Offline behavior when required.

### 7. Add Accessibility

For every interaction:

- Set role.
- Set accessible name.
- Set state when applicable.
- Ensure adequate touch target.
- Support dynamic text.
- Manage modal focus.
- Avoid color-only meaning.
- Make errors understandable.

### 8. Review Performance

For components and lists:

- Use stable keys.
- Keep row props minimal.
- Avoid heavy render work.
- Avoid effects per row.
- Avoid unnecessary memoization.
- Profile before complex optimization.
- Optimize images and pagination when applicable.

### 9. Add Security Controls

Review:

- Data classification.
- Secure storage.
- Logging.
- Screenshot policy.
- App switcher protection.
- Session timeout.
- Background behavior.
- Logout cleanup.
- Sensitive test identifiers.

Do not persist or log more data than necessary.

### 10. Add Tests

At minimum:

- Unit tests for domain rules.
- Unit tests for use cases.
- Unit tests for mappers.
- Hook tests for presentation behavior.
- Component tests for visible states and interactions.
- Integration tests for adapters.
- Regression tests for fixes.
- E2E coverage for critical user journeys.

Prefer semantic queries in component tests.

### 11. Add Test IDs

Create a centralized object for each E2E screen or flow.

```ts
export const FeatureTestIds = {
  screen: '<capability>.<flow>.screen',
  primaryAction: '<capability>.<flow>.primary-action',
  errorMessage: '<capability>.<flow>.error-message',
} as const;
```

Do not add private data or indexes.

### 12. Validate

Run the available commands for:

- Typecheck.
- Lint.
- Unit tests.
- Integration tests.
- Related E2E tests.

## Output

Report:

- Capability created or modified.
- Files changed.
- Architectural decisions.
- Tests added.
- E2E IDs added.
- Security considerations.
- Accessibility considerations.
- Commands executed.
- Remaining risks.

Do not include unrelated refactoring.
