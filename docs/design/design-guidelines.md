# Design and accessibility guidelines

## Sources and ownership

Reserve src/design/tokens as the single token source. Empty placeholder files
have been removed; create token files only when actual values are defined.
No approved iO Design System values are currently supplied. Obtain the approved iO reference before claiming visual parity.
Record an interim design assumption in the feature spec when necessary.

Use primitive values to define semantic tokens (surface, content, action,
feedback), then component variants. Feature UI consumes semantic tokens. Avoid
duplicating colors/spacing in another shared/design-system folder.

## Component contract

Keep general buttons, typography, and input primitives in src/design/components
when first implemented. Keep card-specific composition inside cards/presentation.
Document variants, focus, disabled/loading behavior, dynamic text, contrast and
error presentation. Raw values are allowed in token definitions and documented
platform constraints; do not scatter them through feature styles.

For each screen, specify loading, empty, failure, success, retry, and disabled
states that actually apply. For secure reveal also specify validation, hidden,
expired, capture-restricted, and dismissed states. Prevent repeated taps from
opening overlapping native sessions. Restore focus to the reveal trigger on close.

## Accessibility baseline

- Support VoiceOver and TalkBack with roles, names, states and sensible order.
- Use at least 44 pt touch targets on iOS and 48 dp on Android as project defaults.
- Target WCAG 2.2 AA text contrast: 4.5:1 for normal text and 3:1 for large text.
- Support enlarged text, reduced motion, safe areas and narrow devices.
- Make errors understandable without depending on color or animation.
- Native secure UI must remain accessible. Do not hide all content from screen
  readers as a substitute for privacy; reveal sensitive values only on explicit
  user intent and document the exposure tradeoff.
- Never embed PAN, CVV, tokens, or personal information in accessibility labels
  unrelated to the user's explicit reveal action, test IDs, screenshots or fixtures.

## Evidence

Each UI spec records token/reference provenance, screenshots using synthetic
data, VoiceOver/TalkBack checks, large-text checks, focus restoration, and platform
differences. Never store a screenshot of real card details in the repository.
Use [quality gates](../engineering/quality-gates.md) for completion criteria.
