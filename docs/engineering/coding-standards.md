# Coding standards

Apply these standards to new and modified code. The stack declared in
package.json is authoritative. Repository instructions live in
[AGENTS.md](../../AGENTS.md), rather than being duplicated in this handbook.

## Ownership and design

Follow [capability boundaries](../architecture/architecture.md),
[naming conventions](naming-conventions.md), and
[SOLID, KISS, DRY and pattern selection](design-principles.md).

Keep domain framework-free, application dependent on ports, adapters in
infrastructure, and UI orchestration in presentation. Compose at the app
boundary. Avoid cross-capability deep imports and hidden global dependencies.
Create only layers and abstractions with an actual responsibility.

## TypeScript and external contracts

- Use strict TypeScript and explicit public API inputs, outputs and failure types.
- Use unknown plus runtime validation for untrusted data. Do not bypass checks
  with any, ts-ignore, ts-nocheck or double casts.
- Prefer readonly data, discriminated unions and exhaustive handling. Use branded
  identifiers or value objects only where an invariant or boundary warrants them.
- Translate external DTOs and platform errors at adapter boundaries. Keep native
  exceptions, internal paths and sensitive values out of user-facing errors.
- Do not ignore failures or use empty catch blocks. Distinguish expected business
  failure from unexpected infrastructure defects; normalize stable error codes.
- Path aliases are not configured. Do not introduce imports using an alias until
  runtime, compiler, test and lint tooling resolve it consistently.

## React and state

Components are declarative, focused and accessible. Keep business policy,
network/storage calls and concrete native adapters outside screens/components.
Use small hooks for presentation orchestration and clean up external work.

Classify state before choosing a tool: local UI, derived, server, form, session
or navigation. Start with existing tools; do not install a global-state library
without a concrete requirement. Compute derived values instead of duplicating
state. Full card data and reveal tokens never enter persistent UI/global stores.

Use effects for external synchronization, not derived state or direct user-action
handling. Clean up listeners/timers, cancel work, and prevent stale callbacks from
updating a closed flow. Avoid memoization by default; use it for required identity
or measured render/cost problems. Profile before adding complex optimization.

Use virtualized lists for dynamic collections and stable business keys, not array
indexes. Keep rows lightweight. Include loading, error, retry, empty and success
states when applicable; do not force irrelevant states onto every component.

## Native, security and UI

Use supported New Architecture APIs and review actual Codegen compatibility.
The challenge's secure-card module must be custom. Keep logical contracts
consistent across platforms, release resources on invalidation, and never block
JS/UI threads with heavy work. See the
[native workflow](../../.agents/skills/native-integration/SKILL.md).

Follow [secure development](../security/secure-development.md) and update
[control evidence](../security/owasp-matrix.md) for relevant behavior. Use an
injectable clock for deterministic tests; native owns sensitive reveal timing.
Do not confuse JS checks or mocked tests with native authorization or device
capture evidence. Direct console logging and dynamic code execution are prohibited
by the baseline ESLint rules; a future diagnostics adapter must allowlist safe
fields rather than log raw requests.

Consume design tokens from the reserved src/design/tokens path when real tokens
are introduced. Follow [design and accessibility](../design/design-guidelines.md)
for focus, roles, states, contrast, touch targets, text scaling and reduced motion.
Never claim approved iO visual parity without its actual reference.

## Behavioral verification

Test observable rules, interactions, failure outcomes, contracts and cleanup.
Do not assert private method calls, internal state or incidental markup. Prefer
semantic component queries; use stable, non-sensitive E2E IDs for critical flows.
Use deterministic time/network doubles and add regression coverage for behavior
fixes. Native and device tests are necessary for platform security behavior.

Colocate relevant tests; naming is defined in
[naming-conventions.md](naming-conventions.md). Avoid blanket coverage quotas,
implementation-mirroring tests or an entire new suite for low-impact docs edits.

Completion follows [quality gates](quality-gates.md): run checks proportional to
the change, update meaningful decisions/spec evidence, and report commands and
observed results. A check not executed remains pending. Documentation does not
establish OWASP compliance or successful native builds.
