# Quality gates and current limitations

## Change-based checks

| Change | Required evidence |
| --- | --- |
| Documentation/agent instructions | Local links, skill metadata, contradictory-rule review, diff review |
| Every PR, including docs/config/tests | Explicit secrets/sensitive-file review of final diff and introduced commits; separate manual and scanner evidence |
| TypeScript or React behavior | Typecheck, lint, relevant behavioral/regression tests |
| Native contract or security lifecycle | Above plus Codegen/build, native contract/lifecycle tests and supported-platform checks |
| Sensitive display | Actual device/OS capture, background, timeout and storage/log checks |
| UI | Applicable states, token provenance, VoiceOver/TalkBack, focus and large text |
| Dependencies/build/release | Lockfile, advisory/provenance review, native builds and release artifact inspection |

No blanket coverage percentage substitutes for critical behavior. Prefer tests
for wrong/expired tokens, background transitions, duplicate taps, stale callbacks,
cleanup and failure states. Do not add tests that merely mirror internal helpers.

## Commands

```sh
npm run check:docs
npm run typecheck
npm run lint
npm test -- --runInBand
```

The docs check is dependency-free and checks local Markdown file targets in the
project-owned handbook, instructions, skills and specs. It does not validate
external URLs, anchor IDs, architecture imports, security controls or vendored
third-party references. Its scope is deliberate, not evidence of compliance.

Typecheck/lint/Jest need node_modules. There is currently no npm lockfile;
establish one through a reviewed install before adopting npm ci. No CI workflow,
secret scanner, dependency scanner, import-graph checker, native security tests or
E2E runner is configured by this baseline. These remain explicit follow-up work.

## Next hardening steps

1. Resolve/install dependencies, commit package-lock.json, review advisories and
   validate the starter on Android/iOS.
2. Add CI with minimum read permissions and actions pinned to reviewed SHAs:
   npm ci, docs, typecheck, lint and tests; add appropriate secret and dependency
   scanning with triage and owner review.
3. Enforce capability/layer boundaries with a parser-based import-graph tool;
   cover relative imports and cycles rather than relying only on alias patterns.
4. Implement native security contracts and native/device tests from SEC-001..006.
5. Require reviewed checks and security-sensitive diffs through repository branch
   protection. Branch protection and secret-scanning availability are account
   settings; they are not enabled by adding a Markdown file.

## Done means observed

The [secrets PR gate](../security/secure-development.md) applies to every change.
Confirmed leaks block approval/merge; .gitignore is not a scan. Automated secret
scanning and required repository checks remain pending configuration.

Report checks as passed only after execution. Record missing environments and
device evidence without treating them as passes. Update the spec and OWASP
matrix with sanitized evidence links when a control progresses to verified.
