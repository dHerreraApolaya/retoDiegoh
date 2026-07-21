---

name: native-integration
description: Build or review React Native 0.85 integrations between TypeScript and Android/iOS using Turbo Native Modules, Codegen, promises, events, callbacks, secure contracts, and native tests.

---

# Native Integration

Use this skill for SDKs, secure storage, biometrics, device APIs, sensors, permissions, security controls, and platform-specific functionality.

Follow `AGENTS.md`.

## Decision Order

Before creating native code, evaluate:

1. React Native built-in API.
2. Maintained New Architecture-compatible library.
3. Custom Turbo Native Module.
4. Legacy bridge only with explicit justification.

## Communication Mechanism

Use a Promise when:

- JavaScript initiates the operation.
- The operation returns one result.
- The operation may fail asynchronously.

Use an event when:

- Native code initiates updates.
- Multiple values may be emitted.
- JavaScript subscribes and unsubscribes.

Use a callback only when:

- Required by an external native SDK.
- Promise or event modeling is not appropriate.
- Invocation frequency is explicitly controlled.

Use a synchronous method only when:

- No I/O is involved.
- The result is immediate.
- The operation is lightweight.
- Profiling confirms it is safe.

## Contract Design

Define the TypeScript Codegen specification first.

Requirements:

- Explicit input and output types.
- Equivalent Android and iOS behavior.
- Stable error codes.
- No platform exception leakage.
- No native object exposure.
- No sensitive event payloads.
- No ambiguous optional fields.

Example:

```ts
export type NativeOperationError = {
  readonly code:
    | 'UNAVAILABLE'
    | 'INVALID_INPUT'
    | 'PERMISSION_DENIED'
    | 'CANCELLED'
    | 'UNEXPECTED';
  readonly message: string;
  readonly recoverable: boolean;
};

export interface Spec extends TurboModule {
  performOperation(input: NativeOperationInput): Promise<NativeOperationResult>;

  readonly onStateChanged: CodegenTypes.EventEmitter<NativeStateEvent>;
}
```

## Threading

Do not block:

- JavaScript thread.
- Android main thread.
- iOS main thread.

Move I/O, cryptography, file operations, SDK processing, and heavy parsing to appropriate background execution.

Return to the main thread only for UI-related native operations.

## Lifecycle

A stateful native module must:

- Initialize resources explicitly.
- Avoid duplicate listeners.
- Cancel pending operations.
- Remove observers.
- Release SDK resources.
- Clear references.
- Implement invalidation cleanup.
- Handle application background and foreground transitions.

Every JavaScript subscription must provide cleanup.

## Error Handling

Normalize Android and iOS errors into the same logical contract.

Do not expose:

- Java/Kotlin exception class names.
- `NSError` domains.
- Stack traces.
- Local paths.
- Device details.
- SDK internal messages.
- Secrets.

Use stable codes that application code can safely handle.

## Security

- Do not log full arguments.
- Do not store secrets in static fields.
- Do not emit credentials through events.
- Avoid retaining activities, contexts, or view controllers.
- Minimize sensitive data crossing the JS/native boundary.
- Clear sensitive values when no longer required.
- Apply screenshot and app-switcher protections through scoped lifecycle APIs.
- Use Keychain and Keystore through capability ports.

## Testing

Add:

- Kotlin unit tests.
- Swift unit tests.
- TypeScript contract tests.
- Success tests.
- Error mapping tests.
- Cancellation tests.
- Listener cleanup tests.
- Invalidation tests.
- Android/iOS parity tests.
- E2E coverage for critical behavior.

Mock the native contract in JavaScript tests, not the business logic consuming it.

## Validation Checklist

- [ ] Turbo Native Module and Codegen are used.
- [ ] Contract is defined before implementation.
- [ ] Android and iOS behavior match.
- [ ] Heavy work runs off the UI thread.
- [ ] Errors are stable and typed.
- [ ] Listeners are removable.
- [ ] Pending work is cancellable.
- [ ] Resources are released.
- [ ] Sensitive information is protected.
- [ ] Native and contract tests exist.
- [ ] Critical E2E flow exists.

## Output

Report:

- Contract created or changed.
- Android implementation.
- iOS implementation.
- Threading decisions.
- Lifecycle handling.
- Error codes.
- Security controls.
- Tests added.
- Commands executed.
- Platform differences or risks.
