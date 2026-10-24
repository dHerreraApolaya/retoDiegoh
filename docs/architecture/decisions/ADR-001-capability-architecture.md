# ADR-001: Capability boundaries with internal clean layers

- Date: 2026-10-23
- Status: source/test paths superseded by [ADR-002](ADR-002-screaming-feature-architecture.md); inward dependency principles retained
- Scope: code organization and documentation; feature implementation remains pending.

## Context

The challenge values SOLID, Clean Architecture, vertical slicing, and
BIAN-inspired ownership. The starter already has native hosts, design-token
paths, and feature-spec templates. Existing instructions describe both
capability-level and feature-level layer trees, which would create ambiguity.

## Decision

Use src/capabilities/<capability>/{domain,application,infrastructure,presentation}.
A feature spans those layers. Reserve src/design/tokens for real token values; remove unused empty placeholders. Preserve
native host paths; defer extracting a distributable library until its contract
exists. Place discoverable agent instructions at the repository root and local
skills in .agents/skills. Keep detailed policy in docs and feature evidence in specs.

## Alternatives

- Global screens/services/models: simple initially, but weak business ownership.
- Four global clean layers: dependency direction is visible but feature changes
  scatter across the repository.
- Full layer trees per feature: stronger isolation for independent features,
  but duplicates card models and ports at this project's current size.
- Immediate workspace monorepo: useful for a published library later, but changes
  Metro/native tooling before proving the secure module.

## Consequences

Ownership and dependency direction are explicit. Some features share models
within one capability. Shared must remain small. Review must check boundaries
until an import-graph gate is installed. This decision can be superseded by a
new ADR if library distribution or team ownership warrants a different boundary.
