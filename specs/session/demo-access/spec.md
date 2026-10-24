# Sesión de prueba y navegación Login/Home

Fecha: 2026-10-24, America/Lima. Estado: IMPLEMENTED; validación de dispositivo/E2E pendiente.
Alcance confirmado por el usuario: acceso local sin credenciales, sin llamadas a
Firebase, UI mínima, sesión solo en memoria y cinco minutos absolutos desde el
inicio, incluyendo segundo plano. No se renueva por actividad ni se restaura al
reiniciar el proceso/app. Segundo plano antes de expirar conserva la sesión.

## Escenarios BDD

### SESSION-01: arranque sin sesión

Given una nueva instancia de la app; When se inicia; Then muestra Login y no Home.

### SESSION-02: acceso de prueba

Given Login; When se pulsa «Iniciar sesión de prueba»; Then aparece Home y Login
sale del historial. No se solicitan ni validan credenciales.

### SESSION-03: duración absoluta

Given una sesión iniciada; When transcurren 299999 ms; Then sigue activa.
When se alcanzan 300000 ms; Then vuelve a Login y limpia los datos de usuario.
Repetir el inicio mientras está activa no cambia su vencimiento.

### SESSION-04: segundo plano antes de vencer

Given Home; When la app pasa a background y vuelve antes de cinco minutos;
Then conserva Home y la fecha límite original.

### SESSION-05: segundo plano después de vencer

Given temporizadores suspendidos por el sistema; When vuelve después del plazo;
Then revalida antes de reanudar consultas, elimina Home y muestra Login.

### SESSION-06: cierre manual

Given Home con datos en caché; When pulsa «Cerrar sesión»; Then muestra Login,
limpia la caché y no puede volver a Home usando Atrás.

### SESSION-07: reinicio y nuevo acceso

Given una sesión previa; When la app se desmonta/reinicia; Then vuelve a Login.
Un nuevo acceso explícito obtiene cinco minutos nuevos; no recupera el anterior.

### SESSION-08: errores y liberación

Given un reloj inválido o regresivo; When se valida el acceso; Then queda cerrado.
Given una app cerrada; When llegan eventos de ciclo de vida posteriores;
Then no recuperan la sesión ni los datos anteriores.

## Fuera de alcance

Firebase funcional, credenciales reales, refresh tokens, persistencia, biometría,
UI de marca, deep links, login remoto y protección bancaria nativa. Esta sesión
local no autentica una identidad ni autoriza operaciones de un backend.

Ver [requisitos](requirements.md), [diseño](technical-design.md),
[pruebas](test-plan.md) y [evidencia](implementation-log.md).
