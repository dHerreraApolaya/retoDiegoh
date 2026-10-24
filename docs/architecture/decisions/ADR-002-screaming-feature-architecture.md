# ADR-002: Feature-owned modules, central composition and resilient tests

- Date: 2026-10-24 (America/Lima).
- Status: accepted user direction for structure and development approach.
- Supersedes: ADR-001 source paths and colocated feature tests only.

## Context and decision

The user explicitly chose src/modules/features/<feature> with clean layers,
`src/modules/__tests__/<feature>` and src/navigation. Adopt those paths and name
features after business concepts. Keep bootstrap/cross-feature orchestration in
src/app; use narrow public index.ts contracts and no cyclic feature imports.
Cross-cutting session lifetime remains owned by session, not generic shared code.

Preserve inward dependencies, composition over speculative patterns and native
hosts. Authentication and Home presentation accept actions; app composes the
session with cache/lifecycle, and navigation selects route groups. Do not add
empty layers or a global service locator. There is no Firebase interaction in
this phase.

## Verification decision

Use Given/When/Then acceptance scenarios and red/green/refactor TDD. Assert public
outcomes and visible behavior rather than internal structure. No snapshot tests.
Prefer accessible role/name, then label/text, then stable flow-owned test IDs.
Supply IDs for future E2E without replacing accessibility. Keep feature tests
centralized by owner and app-level smoke tests at their current locations.

## Consequences

Tests remain stable when algorithms or screen nesting change. Bootstrap remains
small and explicit; modules do not share internal files. Moving policy out of
screens and keeping adapters behind contracts prepares later Firebase integration.
The local demo grants no server-side authorization. Device lifecycle/E2E evidence
is required separately from Jest; no compliance claim follows from this ADR.
