# TanStack and Firebase boundaries

## Selected libraries

- @tanstack/react-query 5.104.5: remote-state orchestration in presentation/app.
- @react-native-firebase/{app,auth,firestore} 27.1.0: native integrations behind
  capability-owned infrastructure adapters and application ports.
- No TanStack Router or web-only UI library is added to a native app.

Domain/application never import these SDKs. Query functions call use cases/ports;
Firestore DTOs and SDK errors are translated at the adapter. Authentication owns
its credential/session boundary; cards/accounts receive only necessary contracts.

## Query cache

AppProviders creates one in-memory QueryClient per mounted application and binds
focus to React Native AppState with cleanup. The cache is for non-sensitive
summaries only. PAN, CVV, reveal grants and login credentials must never be query
data, keys, mutation payload metadata, persisted caches or devtools output.

Queries have bounded retries; mutations are not automatically retried. Clear user
queries on logout/account change when login is implemented. Network-aware resume
can be connected to onlineManager through a connectivity adapter when a feature
requires it; no unimplemented connectivity integration is claimed here.

## Firebase project configuration

Dependencies and native linkage are prepared, but no real Firebase project,
login flow, Firestore data access or authorization rules have been activated.
The starter remains disconnected without local configuration. Native Android
applies google-services only when its local config exists; iOS configures the
default Firebase app only when a bundled config is supplied. No service-account
or Admin SDK credentials belong in a client app.

Supply android/app/google-services.json and the iOS GoogleService-Info.plist
locally through an approved channel when enabling a project. Add the plist to the
app target using Xcode; it is not currently included. These files remain ignored
and the tracked-file gate rejects committing them as a project policy. Public
client configuration is not itself server authorization. Keep collection disabled
by default through firebase.json and avoid unnecessary analytics packages.

Before implementing Firestore access, write deny-by-default rules, constrain
authenticated ownership and allowed fields, and test allowed and denied cases
with the Firebase emulator. Do not store full PAN/CVV/reveal grants in Firestore
or use insecure test-mode rules. Emulator tests and service configuration are
not part of the current starter's completed validation.

## Compatibility decisions

Firebase Auth's Android SDK contains Kotlin 2.4 metadata. The RN template's
Kotlin 2.2 cannot consume it, so the project explicitly pins Kotlin 2.4.21 in
the root classpath. That compiler supports Gradle 9.4.1 / AGP 9.2.1 according to
the [official compatibility table](https://kotlinlang.org/docs/gradle-configure-project.html).
Do not skip metadata checks or force mixed compiler versions.

React Native's ecosystem metadata currently accepts ESLint 9. The RN 0.87.1
preset's older Flow plugin requests ESLint 8, so a scoped override selects Flow
3.0.11 with an ESLint-9-compatible peer contract. Strict peer checking stays on;
this exception must be removed when the preset catches up. Do not force ESLint 10
through an unsupported peer range simply to silence a deprecation notice.

The Firestore JS SDK transitively brought a vulnerable gRPC version. A scoped
override selects @grpc/grpc-js 1.14.6; keep it only while needed and rerun
dependency audits on updates. See the
[upstream advisory](https://github.com/grpc/grpc-node/security/advisories/GHSA-m9gg-hp2v-232j).

Dependency scripts are blocked by default. Firebase util's environment-injection
postinstall and protobufjs's advisory postinstall were reviewed and remain denied;
do not auto-approve all builds. Native Firebase uses its platform SDKs, while any
future web/fallback SDK path needs its own runtime validation.

## References

- [RN 0.87 release](https://reactnative.dev/blog/2026/08/11/react-native-0.87)
- [RN support policy](https://reactnative.dev/releases/overview)
- [TanStack Query for React Native](https://tanstack.com/query/latest/docs/framework/react/react-native)
- [React Native Firebase setup](https://rnfirebase.io/)

RN 0.87 is selected by the project requirement. The official maintenance policy
tracks the latest three minor lines, not a guaranteed support date. Review support
before December 2026 and migrate through a tested PR if its status changes.
