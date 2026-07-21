---

name: review-change
description: Review React Native changes for correctness, architecture, SOLID, security, accessibility, performance, native lifecycle, naming, and automated test coverage.

---

# Review Change

Use this skill for pull requests, patches, refactoring, bug fixes, and generated code.

Follow `AGENTS.md`.

## Review Order

Review in this priority:

1. Functional correctness.
2. Security and privacy.
3. Native crashes, leaks, and lifecycle issues.
4. Architectural boundaries.
5. Missing or weak tests.
6. Accessibility.
7. Performance.
8. Naming and maintainability.

Do not prioritize formatting preferences over real defects.

## Review Areas

### Correctness

Check:

- Business rules.
- Edge cases.
- Async race conditions.
- Error handling.
- Cancellation.
- Background and foreground behavior.
- Loading, empty, error, and success states.
- Regression risk.

### Architecture

Check:

- Capability ownership.
- Dependency direction.
- Deep imports between capabilities.
- Business logic inside components.
- Infrastructure leaking into domain or application.
- DTO leakage.
- Unnecessary abstractions.
- Misapplied patterns.
- SOLID violations.
- KISS and DRY misuse.

### React and Hooks

Check:

- Derived state stored unnecessarily.
- Effects used for non-effects.
- Missing cleanup.
- Stale closures.
- Incorrect dependencies.
- Oversized hooks.
- Unstable public APIs.
- Unnecessary memoization.
- Excessive context or global state.
- Server state duplicated locally.

### Lists and Performance

Check:

- Index keys.
- Heavy row rendering.
- Effects per list item.
- Unstable callbacks.
- Oversized images.
- Missing virtualization.
- Unmeasured optimization.
- Work on the JS or UI thread.
- Excessive JS/native communication.

### Native Integration

Check:

- Legacy bridge usage without justification.
- Contract mismatch between platforms.
- Main-thread blocking.
- Callbacks invoked incorrectly.
- Events without removal.
- Native observers without cleanup.
- Pending work without cancellation.
- Platform exceptions exposed.
- Sensitive payloads.
- Context or view controller leaks.

### Security

Check:

- Insecure storage.
- Sensitive logs.
- Tokens in analytics.
- Private data in test IDs.
- Missing session cleanup.
- Timeout logic based only on intervals.
- Screenshot or app-switcher exposure.
- Unsafe clipboard behavior.
- Disabled TLS checks.
- Unvalidated external input.
- Secrets embedded in source code.

### Accessibility

Check:

- Missing roles or names.
- Incorrect accessible state.
- Color-only meaning.
- Inadequate touch targets.
- Missing focus management.
- Dynamic text issues.
- Inaccessible errors.
- Non-semantic pressable elements.
- Missing screen reader support.

### Testing

Check:

- Missing unit tests for domain and use cases.
- Missing regression tests.
- Tests coupled to implementation.
- Excessive mocking.
- Real network, storage, or time in unit tests.
- Missing error cases.
- Missing cleanup tests.
- Missing native contract tests.
- Missing E2E IDs.
- Unstable or sensitive E2E identifiers.
- Critical journey not covered.

### Naming

Check:

- Vague names.
- Incorrect suffixes.
- Generic managers, helpers, or utils.
- Misleading service names.
- Inconsistent test naming.
- Business concepts hidden behind technical names.

## Finding Format

For every relevant issue, provide:

```text
Severity: blocker | high | medium | low
Location: file and line
Problem: concrete issue
Impact: user, business, security, stability, or maintenance consequence
Recommendation: smallest safe correction
Test: test that should be added or updated
```

Example:

```text
Severity: high
Location: CardList.tsx:42
Problem: The list uses the array index as the item key.
Impact: Rows may preserve incorrect state after insertions or reordering.
Recommendation: Use the stable public card identifier.
Test: Add a component test that reorders items and verifies row identity.
```

## Severity

Use `blocker` for:

- Data exposure.
- Authentication bypass.
- Destructive corruption.
- Guaranteed production crash.
- Fundamental contract violation.

Use `high` for:

- Likely crash.
- Significant business defect.
- Native resource leak.
- Sensitive logging.
- Incorrect session behavior.
- Major accessibility blocker.

Use `medium` for:

- Architectural debt with clear impact.
- Weak error handling.
- Missing important tests.
- Measurable performance concern.
- Incorrect naming that hides behavior.

Use `low` for:

- Minor maintainability improvements.
- Small consistency issues.
- Non-critical simplifications.

## Final Summary

End with:

- Overall risk.
- Blocking issues.
- Important improvements.
- Missing validations.
- Recommended merge decision.

Do not invent issues.

Do not claim commands passed unless executed.
