# OWASP control and evidence matrix

Baseline reviewed 2026-10-23. This maps Mobile Top 10 **2024** risks to relevant
MASVS control groups. Group mappings are project interpretations, not official
one-to-one equivalences or proof that every MASVS requirement is covered.
Select precise MASVS controls and MASTG tests in each feature's security test plan.

Statuses: planned, implemented, verified, not-applicable (with rationale),
accepted-risk (with owner approval). A policy document is not implementation
evidence. No mobile security control is currently marked verified.

| Risk | MASVS groups | Required project controls | Evidence before verified | Status |
| --- | --- | --- | --- | --- |
| M1 Improper Credential Usage | AUTH, STORAGE | Ephemeral reveal grants; isolated login credentials; no embedded production secret | Token lifecycle and repository/bundle inspection | planned |
| M2 Inadequate Supply Chain Security | CODE | Reviewed dependencies/skills, lockfile, immutable automation references | Reproducible install, advisory and provenance review | planned; npm lockfile absent |
| M3 Insecure Authentication/Authorization | AUTH | Native validation, card/purpose binding, expiry and replay policy | Negative authorization and concurrency cases | planned |
| M4 Insufficient Input/Output Validation | CODE, PLATFORM | Bounded runtime validation and sanitized native errors/events | Malformed payload and contract tests | planned |
| M5 Insecure Communication | NETWORK | HTTPS and trust validation when remote services exist | Transport tests and release configuration inspection | planned; remote services absent |
| M6 Inadequate Privacy Controls | PRIVACY, STORAGE, PLATFORM | Data minimization; no sensitive telemetry; capture/background handling | Log/telemetry review and device exposure checks | planned |
| M7 Insufficient Binary Protections | RESILIENCE | Review signing, release debug flags and tampering threat assumptions | Built artifact inspection; justified resilience scope | planned |
| M8 Security Misconfiguration | CODE, PLATFORM, NETWORK | Least permissions, safe release settings, isolated debug exceptions | Manifest/ATS/entitlement and release build checks | planned |
| M9 Insecure Data Storage | STORAGE | No full-card/CVV/reveal-token persistence; secure credential adapter if needed | Sandbox, backup, cache and log inspection | planned |
| M10 Insufficient Cryptography | CRYPTO | Platform/reviewed cryptography; no custom cipher; mock keys labelled | Crypto/key lifecycle review and negative validation tests | planned |

## Challenge-specific verification backlog

| ID | Acceptance expectation | Required test/evidence | State |
| --- | --- | --- | --- |
| SEC-001 | No reveal before successful native validation | Invalid, expired, wrong-card and replay tests | planned |
| SEC-002 | Sensitive values disappear on close/background/timeout | Native lifecycle, late callback, device resume tests | planned |
| SEC-003 | Android secure window protects supported capture paths | Screenshot, recording and app-switcher device checks | planned |
| SEC-004 | iOS exposure is accurately bounded | Capture-state and snapshot tests; explicit screenshot limitation | planned; acceptance unresolved |
| SEC-005 | No sensitive logs, persistence, events or analytics | Synthetic marker inspection across each output channel | planned |
| SEC-006 | Release configuration excludes debug trust/network exceptions | Inspect merged release manifest, ATS and signing settings | planned |
| SEC-007 | No committed real secrets or sensitive credential files | Explicit PR diff/introduced-commit review and separately recorded scanner results | policy defined; automated scan pending |

For every future verified row, link the code location, exact test/MASTG procedure,
command, build/commit, platform and OS, date, observed result and sanitized
artifact. Store this evidence under the feature spec; avoid sensitive captures.

Web Top 10 applies if backend/web surfaces are introduced. Agentic Top 10 informs
development-tool policy in [agent-workflow.md](../ai/agent-workflow.md); it does not
mean this app embeds an LLM or agent.
