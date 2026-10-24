---
name: build-feature
description: Implement a business feature in this repository using capability boundaries and requirement-based verification.
---

# Build a capability feature

Read [AGENTS.md](../../../AGENTS.md), the relevant feature spec, and
[architecture](../../../docs/architecture/architecture.md). Read
[design](../../../docs/design/design-guidelines.md) for UI and
[security](../../../docs/security/secure-development.md) for sensitive data.

- Resolve feature behavior and acceptance criteria before dependent code. Record
  material assumptions; preserve existing user authorization for routine choices.
- Apply [naming conventions](../../../docs/engineering/naming-conventions.md) and
  [design principles](../../../docs/engineering/design-principles.md). Identify
  the concrete need for each pattern; preserve SOLID boundaries, KISS and DRY
  without forcing unrelated concepts into shared abstractions.
- Use src/modules/features/<feature> with only the clean layers actually needed,
  feature tests in `src/modules/__tests__/<feature>` and navigators in src/navigation.
  Keep domain/application framework-free; cross-feature coordination belongs to
  app composition and uses narrow public APIs, never deep imports or cycles.
- Reserve src/design/tokens for real token values. Do not invent approved iO
  values, create empty placeholder files or add a competing design-system tree.
- Keep full card values native and reveal tokens transient. This challenge
  requires a custom secure-card module, not an equivalent prebuilt library.
- Implement applicable loading/error/empty/success states, accessibility and
  lifecycle cleanup. Choose state tools from actual needs, not by default.
- Define BDD Given/When/Then outcomes, then follow red/green/refactor TDD.
  Snapshot tests are prohibited. Assert results, not implementation structure.
  Prefer role/name, then label/text, then stable testID where needed. Add
  flow-owned, non-sensitive IDs for critical actions to support future E2E.
- Add behavior-focused tests for changed rules and critical failures. Use semantic
  queries and non-sensitive stable E2E identifiers. See
  [quality gates](../../../docs/engineering/quality-gates.md).
- Run only available checks and record outputs. Update feature evidence and
  significant design deviations. Never mark unexecuted device checks as passed.

Return the behavior delivered, material decisions, executed checks and pending
risks in Spanish. Do not add unrelated refactors or new approval ceremonies.
