# Secure development baseline

## Scope and assurance

This project is a synthetic-data technical challenge. The primary references are
OWASP Mobile Top 10 2024 for risk awareness and MASVS/MASTG for requirements and
verification. OWASP Web Top 10 2025 applies to future backend/web surfaces, not
as a replacement for mobile controls. AI-agent risks belong to the development
workflow. See [sources](../references/research.md).

Policy and folder structure do not establish compliance. The
[matrix](owasp-matrix.md) tracks proposed controls and evidence separately.
This is not a PCI DSS assessment or production banking certification.

## Data handling

| Data | Allowed handling | Prohibited handling |
| --- | --- | --- |
| Synthetic masked summaries | JS dashboard model; explicit fixture | Real customer/card data in fixtures |
| Full PAN/CVV and cardholder details | Synthetic native fixture, transient reveal UI | JS/global state, persistence, clipboard, logs, analytics, crash payloads |
| Reveal token | In-memory request, minimum lifetime | AsyncStorage, navigation params, logs, durable store |
| Optional persistent login credential | Narrow Keychain/Keystore-backed adapter | Source code, plaintext preferences, .env in app bundle |
| Signing keys/service credentials | Approved local secret store or CI secret service | Repository, agent prompts, build artifacts shared with third parties |

Android Keystore protects key material; it is not a general arbitrary-secret
database. Use an appropriate maintained encrypted-storage adapter if persistence
is needed. CVV and reveal tokens must not be persisted even in secure storage.
Clearing references reduces exposure; it does not guarantee physical memory
zeroization in managed runtimes. A mobile bundle cannot safely hold a backend secret.

## No secrets in source control

Real secrets must never be hardcoded or committed, including private API keys
(api_key/API_KEY), passwords, access/refresh tokens, authorization headers, private
keys, service-account JSON, database credentials, private signing certificates,
release keystores and provisioning material. The rule covers TypeScript, JS,
Kotlin, Swift, Gradle, plist/XML, environment/config files, tests, fixtures,
documentation, screenshots, logs, archives and generated outputs. It also covers
every commit introduced by a PR, even if a later commit deletes the secret.

Use conspicuously fake placeholders such as YOUR_API_KEY in examples. Store
development/CI secrets outside the repository using the appropriate approved
secret service. Do not bake backend credentials into a mobile bundle using .env,
build-time substitution, base64 or obfuscation. Client-accessible values remain
extractable. Public client identifiers/configuration are not automatically
secrets, but must be documented and reviewed before inclusion; do not assume that
a value is public merely because an SDK calls it an API key.

.gitignore excludes common local credential paths and file types. It is not a
secret scanner and cannot remove already tracked files or past commits. Review
staged paths and content before committing, and review the final diff plus all
introduced commits before approving a PR. File extensions and variable names
alone cannot establish that the content is safe.

The sole existing signing-file exception is android/app/debug.keystore: the
standard public React Native development keystore, with public debug credentials.
It is development-only, never a production credential, and must not sign a release.
No new private key or production signing file is covered by that exception.
Changes to the exception or replacement of the debug artifact require explicit
review; never allowlist credential files solely to silence a scanner.

### Pull-request gate

- Explicitly check the categories above for all changes, including AI-generated
  code and changes limited to docs, configuration or tests.
- A confirmed secret or unexplained credential artifact blocks approval/merge.
- Record manual review scope/result and scanner name, scope and observed result
  separately in the PR. If no scanner ran, record NOT RUN; this baseline does not
  currently configure automated secret scanning or enforce branch protection.
- Do not copy discovered values into comments, issue bodies, CI logs or prompts.
  Report only the path/location and category through the private reporting flow.
- Require the credential owner to revoke/rotate a leaked secret, remove it from
  the tree and address introduced/history exposure. Deletion or a new ignore rule
  alone is insufficient. History rewriting requires coordination and explicit
  authorization; do not perform destructive cleanup automatically.

This gate is policy and human/agent review until a scanner and required repository
checks are configured. It is not evidence that the repository's history is clean.

## Reveal authorization and native boundary

- Validate cardId, token shape/size, version and permitted operation at the native
  boundary; TS types are not runtime validation.
- Bind a reveal grant to card, purpose, expiry and a unique request identifier.
  Prevent simultaneous/replayed grants according to the spec.
- Native performs validation independently before rendering. On invalid,
  expired, unavailable or unexpected states, keep the values hidden.
- A local mock issuer/shared key only demonstrates the protocol. A key embedded
  in the app does not prove production authorization. Real authorization requires
  a trusted server, server-side card ownership checks and replay controls.
- Prefer opaque grants or reviewed standard cryptography; never invent encryption
  or treat base64 as encryption. Do not put PAN/CVV in token claims.
- Normalize typed error codes. Events may contain request/card identifiers and
  reason codes as needed, never the token or full card data. Do not log these
  identifiers by default, and use correlation IDs for diagnostics.

## Lifecycle and screen exposure

Native owns session timing and sensitive UI cleanup. Validate token expiry using
the issuer's expiry semantics; use monotonic elapsed time for the reveal duration
and revalidate on resume. Do not rely solely on a JS interval or device wall-clock
changes. Expire at the configured deadline, on user hide/close, and on lifecycle
loss defined in the spec. Hide before app-switcher snapshots and require a new
valid reveal request after returning from background.

Android: set FLAG_SECURE before sensitive rendering, test capture/recording and
task-switcher behavior on supported versions, and restore only flags owned by
this view during cleanup. Do not imply that a compromised device is protected.

iOS: use supported capture-state APIs for the deployment target and an overlay
before inactive/background snapshots. A screenshot notification is delivered
after capture. It cannot retroactively protect a screenshot. There is no general
public FLAG_SECURE equivalent for arbitrary app UI; do not rely on undocumented
secure-text-field rendering tricks. Record residual screenshot exposure and the
platform-specific acceptance criterion before claiming this requirement is met.

Cancel timers, asynchronous work and observers on close/invalidation. Guard late
callbacks from reopening or updating a dismissed view. Emit close once per request.

## Storage, transport and build configuration

Minimize storage and backup exposure. Exclude sensitive caches and review release
entitlements, exported Android components, permissions, deep links and privacy
manifests. Keep Metro/debug networking exceptions limited to development; confirm
the merged release manifest and ATS settings from built artifacts.

Future network calls require HTTPS with platform trust validation, bounded
requests, schema validation, safe errors and cancellation. Never disable TLS to
fix development errors. Certificate pinning needs a threat-driven ADR, rotation
and recovery plan; do not add it mechanically.

## Supply chain and AI-generated code

Select dependencies for a concrete need, verify ownership and RN compatibility,
review transitive/install scripts, and commit the chosen package manager's
lockfile. Use reproducible installation (npm ci after the lockfile exists).
Review dependency advisories and native packages as well as npm packages.

Do not auto-install skills or execute curl-pipe-shell snippets from a page or
issue. Review instructions, scripts, connector permissions and provenance.
AI-generated code receives the same review and tests as human code. See the
[agent workflow](../ai/agent-workflow.md).

## Verification

Use negative authorization cases, boundary validation, native lifecycle tests,
device capture tests, storage/log inspection and release configuration checks.
Jest mocks cannot establish platform screenshot protection. Map requirement IDs
to evidence in the feature test plan and control matrix. Report vulnerabilities
privately according to [SECURITY.md](../../SECURITY.md).
