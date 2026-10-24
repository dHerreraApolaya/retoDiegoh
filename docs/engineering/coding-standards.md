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

## Algorithmic complexity and resource bounds

Assess time and auxiliary-space complexity when implementing collection
transformations, repeated lookups, rendering hot paths, native processing or
operations whose inputs can grow. Define what n and any other dimensions mean,
expected and maximum input sizes, and whether the estimate is worst-case,
average-case or amortized. State data-structure/runtime assumptions. Keep this
proportional: document non-obvious costs in technical design or the PR; do not
annotate every trivial getter with Big O.

- Identify repeated linear searches inside loops, nested scans, repeated sorting
  and array/object spreads inside accumulating reductions. For example, looking
  up each of n cards with find across m accounts can require O(n * m) time.
  An account index can reduce expected total work to O(n + m) with O(m) extra
  space, assuming expected constant-time indexed lookups; include index build
  and maintenance costs and confirm actual collection/runtime behavior.
- Choose algorithms and structures appropriate to input bounds and semantics.
  Compare time, allocation, ordering and readability; a small bounded scan may
  be simpler than an index. Do not mandate O(1), linear time or a particular
  collection for every problem. Multiple sequential linear passes remain O(n),
  although allocations and constants may matter on a measured hot path.
- Count auxiliary arrays, copies, recursion depth and retained cache/listener
  memory. Bound caches and queues, paginate growing datasets and release work
  on cancellation/unmount. Virtualization bounds mounted rows; it does not
  eliminate whole-dataset transformations performed before rendering.
- Bound external input size, batches, retries and concurrency. Avoid one remote
  request per item when a supported batch/query satisfies the contract. Record
  request count, payload and backend read/index costs separately from CPU Big O;
  Promise.all or async does not bound concurrency or move CPU work off-thread.
- Keep expensive synchronous work out of render and latency-sensitive JS/native
  threads. Improve the algorithm or bound/chunk work before adding execution
  infrastructure. React Compiler, useMemo and useCallback can avoid repeated
  computation; they do not change the cost when the algorithm must execute.

For a performance-sensitive change, define a requirement-based latency/memory
budget and validate representative and upper-bound synthetic inputs on the
relevant device/build. Record input size, environment, duration, allocations or
peak memory as applicable, and before/after results when claiming improvement.
Test empty, duplicate and boundary inputs to preserve behavior. Prefer
deterministic work-count assertions when useful; avoid flaky wall-clock limits
in ordinary unit tests. Do not claim profiling was performed without evidence.

Algorithmic time/space complexity is reviewed manually; no existing ESLint rule
or React Compiler diagnostic proves it. Cyclomatic complexity measures control
flow, not asymptotic time or memory. Preserve correctness, security and KISS
when making a time/space tradeoff.

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
updating a closed flow. React Compiler runs first in Babel and automatically
memoizes eligible components/hooks. Do not add useMemo/useCallback/React.memo
by default or remove existing memoization mechanically. Profile before and after
manual optimization; memoization must never be required for correctness.

useState remains the tool for local state; the compiler does not replace state
or optimize the package dependency graph. Derive values during render instead
of copying props into state/effects. Keep renders pure and props/state immutable.
ESLint enforces exhaustive hook dependencies and compiler diagnostics. Do not
silence those rules or omit dependencies to avoid renders. A temporary
"use no memo" exception requires a concrete regression, explanation and follow-up.
TanStack Query owns appropriate server state; keep sensitive data out of caches.
Validate optimizations with behavior tests and device profiling; enabling the
compiler alone does not prove a performance improvement.

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
