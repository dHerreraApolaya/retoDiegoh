# Plan de pruebas

- createDemoSession.test.ts: SESSION-01/03/04/05/06/07/08 sobre resultados públicos,
  reloj inyectable y efecto de cierre. Sin inspeccionar estado privado.
- SessionFlow.test.tsx: SESSION-01 a SESSION-07/08 mediante roles/nombres,
  interacciones, visibilidad y datos de caché con navegación real.
- App.test.tsx: arranque observable en Login y acción de acceso local.
- AppProviders/createQueryClient: aislamiento de caché y ciclo de vida.

TDD: registrar fallo inicial antes de crear cada implementación y volver a verde.
No snapshots; no serializar árboles ni asumir índices/hijos, nombres de
componentes internos o forma del estado de React Navigation. IDs disponibles
para futuros E2E, usados como fallback a consultas semánticas en componentes.

Pendiente E2E Android/iOS: arranque, acceso, Atrás, cierre manual, background
corto/largo y cierre/reinicio real del proceso. VoiceOver/TalkBack y tiempos del
sistema requieren dispositivos/simuladores; Jest no los sustituye. Verificar
que los IDs llegan a los elementos nativos en cada plataforma.
