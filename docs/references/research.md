# Research notes and project interpretation

Reviewed on 2026-10-23, America/Lima. Prefer original authors and official
standards over forum popularity. Forum discussions can suggest questions but
are not the authority for security controls. Dates below are publication dates
where stated, otherwise the access date; no claim that every source is recent.

## Architecture and AI engineering

- Robert C. Martin, [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html),
  2012-08-13. Foundation: source dependencies point toward business policy.
  Project decision: capability-local layers with explicit ports and composition.
  This source does not prescribe our exact React Native folder tree.
- Birgitta Böckeler, [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html),
  2026-04-02. Practical context: combine instructions with observable engineering
  feedback. Project decision: concise entry instructions, test evidence and
  explicit pending enforcement instead of assuming Markdown enforces architecture.
- Anthropic, [Effective harnesses for long-running agents](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents),
  2025-11-26. Context: incremental work and persistent progress artifacts help
  across sessions. Project decision: bounded changes and sanitized implementation
  logs; a multi-agent runtime is not required.
- OpenAI, [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md),
  accessed 2026-10-23. Repository discovery follows the root-to-working-directory
  instruction path. Project decision: root AGENTS.md; .github/AGENTS.md is scoped
  to GitHub content, not the only project guide.
- OpenAI, [Build skills](https://learn.chatgpt.com/docs/build-skills), accessed
  2026-10-23. Local repository skills use .agents/skills and SKILL.md metadata.
  Project decision: maintain first-party workflows there and remove duplicate
  legacy .github/skills entry points.

## Security baselines

- OWASP, [Mobile Top 10](https://owasp.org/projects/mobile-top-10), final 2024
  edition, accessed 2026-10-23. Primary mobile risk-awareness taxonomy.
- OWASP, [MASVS](https://mas.owasp.org/MASVS/) and
  [MASTG](https://mas.owasp.org/MASTG/), accessed 2026-10-23. Requirements and
  verification references. Project matrix maps risk categories to control groups;
  exact requirements, applicable tests and evidence are selected per feature.
- OWASP, [Web Top 10:2025](https://top10.owasp.org/2025/), accessed 2026-10-23.
  Additional baseline if a backend/web surface is added, not a mobile substitute.
- OWASP, [Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/),
  published 2025-12-09. Informs tool authority, untrusted instructions and agent
  supply-chain policy in the development workflow; the app has no agent runtime.
- React Native, [Security](https://reactnative.dev/docs/security), accessed
  2026-10-23. Relevant to storage and bundled-secret limitations. Project decision:
  no secret persistence in AsyncStorage and no production secret embedded in app code.
- Android, [Secure sensitive activities](https://developer.android.com/security/fraud-prevention/activities),
  accessed 2026-10-23. FLAG_SECURE is a window-level capture protection; test on
  supported devices rather than assuming identical behavior everywhere.
- OWASP, [MASTG-BEST-0014](https://mas.owasp.org/MASTG/best-practices/MASTG-BEST-0014/),
  accessed 2026-10-23. Reference for screenshot and recording protection and
  platform limitations. Project decision: document Android/iOS differences.
- Apple, [userDidTakeScreenshotNotification](https://developer.apple.com/documentation/uikit/uiapplication/userdidtakescreenshotnotification),
  accessed 2026-10-23. Notification occurs after a screenshot. Treat it as detection,
  never proof that the screenshot was prevented.

## Design references

- W3C, [WCAG 2.2](https://www.w3.org/TR/WCAG22/), accessed 2026-10-23:
  contrast and accessible interaction baseline, adapted to native UI.
- Apple, [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons),
  accessed 2026-10-23: 44 pt minimum hit region guidance.
- Android, [Make apps more accessible](https://developer.android.com/guide/topics/ui/accessibility/views/apps-views),
  accessed 2026-10-23: 48 dp touch target guidance.

The approved iO Design System reference has not been supplied. Existing token
filenames do not establish visual values, accessibility compliance or brand parity.
