# Engineering handbook

This is the project's maintained guidance, reviewed on 2026-10-23 (America/Lima).
These are project conventions informed by the sources below, not a universal
folder standard or a security certification.

| Question | Source of truth |
| --- | --- |
| What should the product do? | [Functional specs](../specs/README.md) |
| Where does code belong? | [Architecture](architecture/architecture.md) |
| Why was this structure chosen? | [ADR-001](architecture/decisions/ADR-001-capability-architecture.md) |
| How do we write code? | [Coding standards](engineering/coding-standards.md) |
| How do we name code and paths? | [Naming conventions](engineering/naming-conventions.md) |
| How do we apply SOLID/KISS/DRY and patterns? | [Design principles](engineering/design-principles.md) |
| How do we design screens? | [Design guidelines](design/design-guidelines.md) |
| How do we protect data? | [Secure development](security/secure-development.md) |
| What threats are considered? | [Threat model](security/threat-model.md) |
| What is actually verified? | [OWASP matrix](security/owasp-matrix.md) |
| How do AI agents work here? | [Agent workflow](ai/agent-workflow.md) |
| Which skills are trusted? | [Skill inventory](ai/skill-inventory.md) |
| What checks are needed? | [Quality gates](engineering/quality-gates.md) |
| What was checked in this baseline? | [Verification record](engineering/baseline-verification.md) |
| What informed these decisions? | [Research notes](references/research.md) |

AGENTS.md is the short entry point. Guides hold durable policy. ADRs record
decisions. Specs describe feature behavior and evidence. Skills encode repeatable
workflows and link back to policy instead of duplicating it.
