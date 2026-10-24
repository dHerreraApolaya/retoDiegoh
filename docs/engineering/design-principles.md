# Design principles and pattern selection

Apply these rules to human-written and AI-generated code alike. Patterns must
solve a concrete requirement or boundary; do not add classes, interfaces or
inheritance merely to claim pattern usage. Record the decision in the relevant
technical design; use an ADR only for consequential cross-cutting decisions.

## Principles as reviewable decisions

| Principle             | Expected application                                                                                      | Defect to look for                                                            |
| --------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Single responsibility | One cohesive reason to change per module; presentation renders, use cases orchestrate, adapters integrate | A hook that fetches, validates grants, stores credentials and renders UI      |
| Open/closed           | Put actual replaceable behavior behind a narrow contract                                                  | Switches for every adapter inside domain logic; speculative plugin frameworks |
| Liskov substitution   | Implementations preserve contract outcomes, errors and lifecycle semantics                                | A mock succeeds for input that the real adapter must reject                   |
| Interface segregation | Ports expose only operations needed by the consumer                                                       | One dependency requiring network, analytics, storage and UI methods           |
| Dependency inversion  | Application owns required ports; infrastructure implements them; composition wires dependencies           | A use case importing a concrete native module or HTTP client                  |
| KISS                  | Choose the smallest design that satisfies behavior, security and testability                              | Factories around trivial objects, service locators or unnecessary inheritance |
| DRY                   | Keep each business rule and policy authoritative in one place                                             | Expiry validation duplicated across screens with inconsistent semantics       |
| YAGNI                 | Add extension points when a real variation or boundary exists                                             | Empty layers, unused interfaces, generic CRUD bases and speculative folders   |

DRY concerns duplicated knowledge, not every repeated line. Similar-looking code
for different business concepts may remain separate. Do not force unrelated
capabilities into a shared abstraction. Native and JS validation at trust
boundaries may intentionally overlap: native must not trust a prior JS check.
Keep their contracts and tests consistent rather than deleting defense in depth.

## Pattern decision guide

| Concrete need                           | Appropriate pattern                      | Project example                                     | Avoid                                             |
| --------------------------------------- | ---------------------------------------- | --------------------------------------------------- | ------------------------------------------------- |
| Isolate a required external capability  | Port + Adapter with dependency injection | SecureCardView implemented by NativeSecureCardView  | A universal platform manager                      |
| Substitute an actual data source        | Repository or narrow reader port         | CardReader with mock/HTTP adapters                  | Generic Repository<T> without domain semantics    |
| Convert untrusted external shape        | Mapper / anti-corruption boundary        | mapCardResponse validates a DTO into a safe summary | DTOs leaking into screens                         |
| Model valid/invalid session transitions | Explicit state machine                   | hidden -> validating -> visible -> closed/expired   | Independent booleans allowing visible and expired |
| Handle expected failure                 | Typed Result/discriminated union         | success or TOKEN_EXPIRED                            | Empty catch blocks and ambiguous nulls            |
| Swap real alternative policy            | Strategy                                 | Different supported grant validators, if required   | Strategy classes when one pure function suffices  |
| Assemble a capability's dependencies    | Composition factory                      | createCardsCapability                               | Hidden globals or Service Locator                 |
| Receive repeated native updates         | Observer with explicit teardown          | Sanitized secure-view lifecycle events              | Global untyped event bus or leaked listeners      |

A pattern name does not justify a dependency or implementation. Prefer pure
functions for simple rules and transformations. Use classes where state,
lifecycle or substitutable behavior warrants them. Composition is the default;
inheritance requires a valid substitutability relationship.

## Required AI implementation rationale

For a feature or architectural change, briefly record:

1. The business requirement and boundary being protected.
2. The simplest approach considered and the selected pattern, if any.
3. How responsibilities, dependency direction and contracts preserve SOLID.
4. Which knowledge is shared and which duplication is intentionally retained.
5. Observable tests for the rule, error and lifecycle behavior being changed.
6. For growing collections or hot paths, input bounds, time/auxiliary-space
   complexity, relevant assumptions and the chosen tradeoff. Follow
   [algorithmic complexity guidance](coding-standards.md#algorithmic-complexity-and-resource-bounds);
   include actual profiling evidence when claiming a performance improvement.

Keep this proportional: a local pure-function fix can justify itself in the
implementation log or review summary. A documentation correction needs no
invented pattern or additional approval. Review the actual code and evidence;
listing SOLID/KISS/DRY in a response is not proof they were followed.
