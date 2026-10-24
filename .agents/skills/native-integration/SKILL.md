---
name: native-integration
description: Build or review this project's React Native native contracts, secure view, and Android/iOS lifecycle behavior.
---

# Native integration

Read [AGENTS.md](../../../AGENTS.md),
[architecture](../../../docs/architecture/architecture.md), and
[secure development](../../../docs/security/secure-development.md).
Use the version declared in package.json, not an assumed React Native version.

Apply [naming conventions](../../../docs/engineering/naming-conventions.md) and
[design principles](../../../docs/engineering/design-principles.md) to native
contracts/adapters; preserve framework-mandated symbols.

For Card Secure View, implement the module yourself: the challenge forbids
ready-made secure-card views or equivalent bridges. For unrelated integrations,
evaluate platform APIs and maintained compatible libraries before custom code.

1. Define the smallest supported Codegen contract in src/native-specs before
   adapters. Check actual Codegen support for the installed RN version; do not
   copy an unverified TurboModule signature. Promises represent one result;
   events represent lifecycle updates, with stable typed errors.
2. Send only bounded card identifiers and transient grants. Native independently
   validates before reveal; full PAN/CVV remains in native synthetic fixtures/UI.
   Events must not contain tokens or sensitive values.
3. Specify invalid/expired/wrong-card grants, reentrancy, cancellation, teardown,
   session ownership and background/foreground transitions. Native owns timing.
4. Use main-thread UI updates without blocking JS/UI with crypto, I/O or parsing.
   Remove observers/timers, release references and guard late callbacks.
5. Apply Android FLAG_SECURE before rendering; document scoped cleanup. On iOS,
   protect snapshots and respond to supported capture state, while documenting
   that screenshot notifications occur after capture. Do not claim blanket
   screenshot prevention or use undocumented view-hierarchy tricks.
6. Verify contract mapping, failures, native lifecycle and supported-platform
   builds. Device capture tests are separate evidence from mocked JS tests.

Report contract, platform differences, actual commands/results and unverified
behavior. Preserve parity of logical outcomes without promising OS feature parity.
