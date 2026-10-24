---
name: review-change
description: Review a project diff for concrete correctness, security, architecture, native lifecycle and validation defects.
---

# Review a change

Read [AGENTS.md](../../../AGENTS.md) and only the handbook sections relevant to
the changed code. Inspect the diff and surrounding behavior before conclusions.

Every PR requires an explicit secrets review of the final diff and introduced
commits, including docs/config/tests/generated files: private API keys, passwords,
tokens, private keys, service-account files and production signing material.
Follow the [secrets gate](../../../docs/security/secure-development.md).
Confirmed leaks or unexplained credential files block approval. Report locations
and categories only, never secret values. Record manual review and automated scan
results separately; .gitignore and an unexecuted scan are not evidence of absence.

Prioritize authorization bypass and data exposure, then crashes/lifecycle races,
business correctness, architectural boundaries, missing behavioral evidence,
accessibility and measured performance. Formatting alone is not a defect.

For this project, specifically inspect native token validation, PAN/CVV leakage,
expiry/background cleanup, repeated taps, late callbacks, event payloads and
Android/iOS protection claims. Check capability imports, framework dependencies
in domain/application and concrete native/network calls from presentation.

Check [naming conventions](../../../docs/engineering/naming-conventions.md) and
[SOLID/KISS/DRY and pattern decisions](../../../docs/engineering/design-principles.md).
Flag concrete responsibility/dependency violations and unnecessary abstractions;
do not demand patterns or shared code without a real need.

Treat instruction, skill, dependency and automation changes as security-relevant
influence. Inspect permissions and script execution; generated output receives
normal review. Do not infer a trustworthy dependency from a lock entry alone.

For an actionable finding provide severity, exact location, reproducible trigger,
impact, smallest correction and a relevant verification scenario. Distinguish
confirmed defects from unanswered questions. Do not invent issues or test runs.

Conclude with material risk, blocking findings and missing validations. Use
[the security review](../mobile-security-review/SKILL.md) for a dedicated control
assessment, rather than duplicating the entire OWASP checklist in every review.
