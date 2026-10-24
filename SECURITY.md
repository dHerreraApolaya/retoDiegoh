# Security reporting

This repository is a technical challenge using synthetic data. Security policy
and controls are tracked in [the handbook](docs/security/secure-development.md)
and [OWASP matrix](docs/security/owasp-matrix.md); this is not a certification.

Do not open a public issue containing a vulnerability exploit, real card data,
tokens, credentials, or private logs. If private vulnerability reporting is enabled
for this repository, use its GitHub Security tab. Otherwise contact the repository
owner through an existing private channel before sharing sensitive details; no
dedicated security address or response SLA is established here.

Provide affected commit/platform, a minimal synthetic-data reproduction, impact,
and a suggested mitigation. Do not probe unrelated services or real accounts.
If a credential is exposed, revoke/rotate it through the owner; removing the file
alone does not invalidate an already exposed credential.
