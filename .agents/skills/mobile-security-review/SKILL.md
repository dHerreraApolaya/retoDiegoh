---
name: mobile-security-review
description: Assess sensitive mobile behavior or security-policy changes against this project's threat model and OWASP evidence matrix.
---

# Mobile security review

Read [AGENTS.md](../../../AGENTS.md),
[secure development](../../../docs/security/secure-development.md),
[threat model](../../../docs/security/threat-model.md), and
[OWASP matrix](../../../docs/security/owasp-matrix.md).

1. Identify changed assets, inputs and trust boundaries. Use synthetic data only.
2. Select applicable Mobile Top 10 risks and MASVS controls; consult relevant
   MASTG procedures when an actual verification target is known. A risk-category
   mapping does not prove a requirement is satisfied.
3. Inspect native grant validation/card binding, fail-closed outcomes, timing and
   lifecycle races, data flow to JS/logs/storage/events, capture controls, and
   release configuration relevant to the change.
4. Distinguish Android capture protection from iOS mitigation and residual
   screenshot exposure. Mark native/device checks pending unless actually run.
5. For dependency/agent changes, assess provenance, untrusted instructions,
   execution permissions and potential exfiltration paths.
6. Record a concrete finding or evidence for each assessed control, with code/test
   location, platform/build, observed result and gaps. Keep matrix statuses honest;
   only an authorized owner can accept residual risk.

Return assessed scope, findings ordered by impact, executed checks and unverified
controls. Never report OWASP/PCI certification from documentation or mocked tests.
