## Problem and resulting behavior

Describe the concrete trigger and the resulting behavior. Link relevant specs/ADRs.

## Validation

List commands actually executed and observed results. State pending checks.
Use N/A with a reason when a category does not apply.

- [ ] Scope, capability dependencies and naming conventions reviewed.
- [ ] SOLID/KISS/DRY applied; selected patterns and intentional duplication justified.
- [ ] Relevant typecheck/lint/tests or documentation checks executed.
- [ ] Security/data handling reviewed; OWASP evidence updated when applicable.
- [ ] No real secrets or sensitive files in source/native code, config, tests, docs, generated artifacts, final diff or commits introduced by this PR: private API keys, passwords, access/refresh tokens, private keys, service-account credentials and release signing material.
- [ ] Examples contain fake placeholders only; local secret files are excluded, and tracked files/history were reviewed independently of .gitignore. Any allowed public development artifact matches the documented exception.
- [ ] Secret-review evidence recorded below; automated scanning is marked passed only if executed. Confirmed leaks block approval until owner-led revocation/rotation and repository cleanup.
- [ ] Native lifecycle, cleanup and platform differences checked when applicable.
- [ ] Accessibility and design-token provenance checked for UI changes.
- [ ] Agent instructions/skills/dependency/automation changes reviewed as code.

## Risks and pending evidence

Document residual risks, unsupported platform behavior and validations not run.

## Secrets review evidence

- Manual review scope (final diff and introduced commits), reviewer and result:
- Automated scanner, scope, command/check and result, or NOT RUN with reason:
- Sensitive-file exceptions, if any (path and justification, never secret values):

Do not paste discovered credentials into this PR, comments, logs or AI prompts.
See [secure development](../docs/security/secure-development.md).
