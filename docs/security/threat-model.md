# Initial threat model

- Reviewed: 2026-10-23; status: design baseline, not validated implementation.
- Assets: sensitive card data, reveal grants, optional login credentials, signing
  keys, trusted source/skills, and accurate validation evidence.
- Trust boundaries: external inputs to JS, JS to native, native to OS display and
  storage, future app to server, repository content to AI tools, developer to CI.
- Assumptions: only synthetic card data; no backend currently exists; native
  secure view and optional Firebase authentication are not implemented.

## Intended flow

1. The dashboard renders masked summaries.
2. An explicit reveal action obtains an ephemeral card-bound grant.
3. The application port invokes the native adapter with a bounded request.
4. Native validates before rendering, then owns secure display and lifecycle.
5. Hide, expiry, background, failure or close removes values and releases work.
6. Sanitized status returns to JS without full card data or credentials.

## Threat register

| ID | Attack/failure | Required mitigation | Evidence required | Status |
| --- | --- | --- | --- | --- |
| T-01 | Tampered/expired grant reveals another card | Native validation, card/purpose binding, fail closed | Invalid, expired, wrong-card and replay cases | planned |
| T-02 | Screenshot, recording, app-switcher exposure | Android secure window; iOS capture/background controls with documented limits | Device/OS capture matrix | planned; iOS residual risk open |
| T-03 | Reveal survives background or late callback | Native deadline, explicit transitions, cancellation and idempotent close | Background, clock change, race and repeated-tap tests | planned |
| T-04 | Token/PAN/CVV leaks through JS, logs or persistence | Minimal native contract, no persistence, allowlisted diagnostics | Contract, log, storage and crash-payload inspection | planned |
| T-05 | Malicious package/skill gains execution or exfiltrates data | Provenance review, lockfile, scoped tools, diff review | Dependency inventory and reviewed skill/script diff | partial policy only |
| T-06 | Hostile issue/PDF instructs the agent to upload secrets | Treat retrieved text as untrusted; preserve task authority and sandbox | Review tool actions and test hostile-instruction scenarios when workflow changes | policy defined |
| T-07 | Release ships debug network exceptions or signing material | Separate debug/release config, artifact inspection, signing isolation | Merged manifest, ATS, entitlements, signed build review | planned |
| T-08 | Local mock key mistaken for production trust | Mark mock grant issuer as demo-only; require server authorization for production | README/spec/API review | policy defined |

## Residual risk and changes

A local attacker controlling the OS/runtime may inspect process data; display
controls cannot prevent an external camera. This challenge does not implement a
server trust boundary or demonstrate resistance to all device compromise.

Risk acceptance records must name the risk, platform/version, owner, rationale,
compensating controls, review date and evidence. An agent must not mark a risk
accepted on behalf of the owner. Update this model when adding networking,
authentication, persistence, new permissions, native SDKs or tool access.
