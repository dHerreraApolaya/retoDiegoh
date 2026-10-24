# GitHub-specific instructions

Repository-wide instructions are in [../AGENTS.md](../AGENTS.md).
Detailed conventions are in [coding-standards.md](../docs/engineering/coding-standards.md).

Keep automation least-privileged and pin third-party actions to reviewed commit
SHAs. Do not expose secrets to untrusted pull-request code or execute
PR-controlled code in privileged pull_request_target jobs.
