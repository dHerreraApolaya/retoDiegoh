# Skill inventory

Canonical first-party workflows are in .agents/skills. Redundant .github/skills
entry points have been removed; maintain only one copy of each workflow.

| Skill                       | Use                                                        | Provenance                                                      |
| --------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------- |
| build-feature               | Capability feature implementation and requirement evidence | Project-owned; migrated from .github/skills                     |
| native-integration          | Custom Card Secure View and other native boundaries        | Project-owned; migrated and aligned with challenge restrictions |
| review-change               | Review a diff and report concrete risks                    | Project-owned; migrated from .github/skills                     |
| mobile-security-review      | Review threat/control changes and verification evidence    | Project-owned; added for this baseline                          |
| react-native-best-practices | Topic-specific React Native reference material             | Existing Software Mansion Labs package; see skills-lock.json    |

The third-party package was present before this change and is preserved without
modification. Its broad trigger does not mandate new dependencies or give it
permission to execute scripts. The existing computed hash is inventory metadata;
its algorithm/provenance and every supporting file have not been independently
audited in this setup. Do not describe it as a verified security pin.

Before adding/updating a skill, inspect its instructions, referenced scripts,
network/file actions, secrets expectations, license and provenance. Record its
source and immutable revision when available. Reject rules that contradict task
authorization or ask to weaken sandbox/TLS/validation. Keep descriptions precise,
workflows short, and policy links current. Validate frontmatter and links after
changes; do not execute example scripts as part of metadata validation.
