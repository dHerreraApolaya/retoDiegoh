# Diseño técnico

Seguir [ADR-002](../../../docs/architecture/decisions/ADR-002-screaming-feature-architecture.md).
Session posee estado discriminado y política de duración. La fábrica
createDemoSession recibe un SessionClock y el efecto de cierre requerido por app.
Sus contratos y reglas no importan React, Firebase ni navegación. SessionProvider
es únicamente el adaptador de presentación a useSyncExternalStore.

AppProviders compone la sesión con QueryClient, limpia datos antes de notificar
el cierre, programa un único timeout de sesión y revalida al activarse antes de
reanudar consultas. El reloj combina el tiempo transcurrido de Date.now() y performance.now(),
usando el mayor para contar también suspensión del dispositivo. Un retroceso
detectado falla cerrado; un adelanto del reloj puede expirar conservadoramente
antes. No se persiste ni se promete resistencia a manipulación del dispositivo.
La navegación tiene un native stack con grupos público/privado condicionales.
Login y Home reciben acciones por props, sin conocer rutas ni otras features.
No se persiste el estado del navegador y no hay parámetros de credenciales.

UI provisional: texto y acciones accesibles; ActionButton comparte el mínimo de
48 puntos. No se definen tokens de marca ni se promete paridad con iO. Los IDs
pertenecen a LoginTestIds/HomeTestIds y no incluyen datos de usuario.

## Patrones y complejidad

Estado discriminado + Observer para el contrato de suscripción React; puerto de
reloj inyectable para pruebas deterministas; composición explícita para coordinar
sesión/caché. No repositorio genérico ni service locator. Cada transición cuesta
O(1) más O(s) para notificar s suscriptores; O(s) de memoria y un timeout activo.
La limpieza de QueryClient depende de las entradas/solicitudes retenidas y no se
describe como O(1). No existen colecciones remotas, lotes ni solicitudes en esta fase.

## Riesgo y evidencia

Jest valida la lógica y la interacción del navegador real con dependencias
nativas simuladas; no acredita tiempos del SO ni restauración de Activity.
Revalidar en resume compensa timers suspendidos. La sesión es una demo local y
no constituye un control MASVS-AUTH ni una autorización de servidor. Reglas del
secure-card view mantienen su futuro cierre sensible en background por separado.
