# Requisitos: [Nombre de la funcionalidad]

## Estado del documento

| Campo                | Valor          |
| -------------------- | -------------- |
| Estado               | DRAFT          |
| Versión              | 0.1.0          |
| Última actualización | YYYY-MM-DD     |
| Aprobador funcional  | [Nombre o rol] |
| Aprobador técnico    | [Nombre o rol] |

## Objetivo funcional

[Explicar en español el comportamiento que debe obtener el usuario.]

## Historia de usuario

**Como** [tipo de usuario]
**Quiero** [acción o capacidad]
**Para** [beneficio esperado]

## Requisitos funcionales

### FR-001: [Nombre del requisito]

**Descripción**

[Describir de forma clara el comportamiento requerido.]

**Prioridad**

MUST / SHOULD / COULD

**Origen**

[Historia, iniciativa, producto, regulación o necesidad técnica.]

**Precondiciones**

- [Precondición].
- [Precondición].

**Comportamiento esperado**

1. [Comportamiento].
2. [Comportamiento].
3. [Comportamiento].

**Resultado esperado**

[Resultado observable.]

**Dependencias**

- [Dependencia].

**Criterios relacionados**

- AC-001
- AC-002

**Pruebas relacionadas**

- UT-001
- CT-001
- E2E-001

---

### FR-002: [Nombre del requisito]

**Descripción**

[Descripción.]

**Prioridad**

MUST / SHOULD / COULD

**Precondiciones**

- [Precondición].

**Comportamiento esperado**

1. [Paso].
2. [Paso].

**Resultado esperado**

[Resultado.]

**Criterios relacionados**

- AC-003

**Pruebas relacionadas**

- UT-002
- E2E-002

## Reglas de negocio

### BR-001: [Nombre de la regla]

[Describir la regla y sus restricciones.]

Ejemplo:

> Una tarjeta que ya se encuentra congelada no puede volver a congelarse.

### BR-002: [Nombre de la regla]

[Describir la regla.]

## Criterios de aceptación

### AC-001: [Nombre del escenario]

**Relacionado con**

- FR-001
- BR-001

```gherkin
Dado que [contexto inicial]
Y [condición adicional]
Cuando [acción realizada]
Entonces [resultado esperado]
Y [resultado adicional]
```

### AC-002: [Nombre del escenario alternativo]

**Relacionado con**

- FR-001

```gherkin
Dado que [contexto]
Cuando [acción]
Entonces [resultado]
```

### AC-003: [Nombre del escenario de error]

**Relacionado con**

- FR-002

```gherkin
Dado que [contexto]
Cuando [ocurre un error]
Entonces [respuesta esperada]
Y [posibilidad de recuperación]
```

## Requisitos no funcionales

### NFR-001: Compatibilidad

La funcionalidad debe operar en:

- Android.
- iOS.
- React Native 0.86.0 (según package.json).
- New Architecture.

### NFR-002: Mantenibilidad

La implementación debe:

- Respetar Vertical Slicing.
- Respetar Clean Architecture.
- Usar TypeScript estricto.
- Mantener dependencias explícitas.
- Evitar lógica de negocio en componentes.
- Estar orientada a pruebas.

### NFR-003: Observabilidad

La funcionalidad debe:

- Registrar eventos técnicos no sensibles.
- Permitir correlacionar fallos mediante un identificador seguro.
- No registrar cuerpos completos ni datos privados.

## Requisitos de seguridad

### SEC-001: Protección de información sensible

[Indicar qué datos son sensibles y cómo deben protegerse.]

### SEC-002: Almacenamiento

[Indicar si se requiere almacenamiento seguro, duración y eliminación.]

### SEC-003: Protección visual

Definir:

| Control                    | Requerido |
| -------------------------- | --------- |
| Bloqueo de captura         | Sí / No   |
| Protección en app switcher | Sí / No   |
| Bloqueo de grabación       | Sí / No   |
| Reautenticación            | Sí / No   |

### SEC-004: Sesión y timeout

- Tiempo máximo de inactividad: [duración].
- Comportamiento al expirar: [acción].
- Comportamiento después de background: [acción].
- Datos que deben eliminarse: [datos].

### SEC-005: Logs

Está prohibido registrar:

- Tokens.
- PIN.
- Contraseñas.
- Datos personales completos.
- Datos financieros completos.
- Cabeceras de autorización.

## Requisitos de accesibilidad

### ACC-001: Lector de pantalla

La funcionalidad debe ser operable mediante:

- VoiceOver.
- TalkBack.

### ACC-002: Elementos interactivos

Cada elemento interactivo debe tener:

- Rol accesible.
- Nombre accesible.
- Estado accesible cuando corresponda.
- Área táctil adecuada.

### ACC-003: Comunicación visual

La funcionalidad no debe depender únicamente de:

- Color.
- Iconos.
- Posición.
- Animación.

### ACC-004: Escalado de texto

[Definir el comportamiento ante tamaños de fuente mayores.]

### ACC-005: Gestión de foco

[Definir el foco inicial, modal y retorno de foco.]

## Requisitos de rendimiento

### PERF-001: Tiempo de respuesta

[Definir tiempo esperado, si existe.]

### PERF-002: Listas

Cuando exista una lista:

- Debe utilizar virtualización.
- Debe usar keys estables.
- No debe usar índices como identificadores.
- Debe soportar paginación cuando corresponda.

### PERF-003: Renderizado

- Evitar cálculos pesados durante render.
- Evitar memoización sin evidencia.
- Medir optimizaciones relevantes.

### PERF-004: Integración nativa

Las operaciones nativas pesadas no deben bloquear:

- JS thread.
- Android main thread.
- iOS main thread.

## Estados de interfaz

La funcionalidad debe contemplar:

| Estado               | Comportamiento |
| -------------------- | -------------- |
| Inicial              | [Descripción]  |
| Cargando             | [Descripción]  |
| Vacío                | [Descripción]  |
| Éxito                | [Descripción]  |
| Error recuperable    | [Descripción]  |
| Error no recuperable | [Descripción]  |
| Sin conexión         | [Descripción]  |
| Sesión expirada      | [Descripción]  |

## Navegación

| Origen     | Acción   | Destino    |
| ---------- | -------- | ---------- |
| [Pantalla] | [Acción] | [Pantalla] |

## Analytics

| Evento         | Momento   | Propiedades permitidas |
| -------------- | --------- | ---------------------- |
| `[event_name]` | [Momento] | [Campos no sensibles]  |

No enviar datos sensibles mediante analytics.

## Matriz de trazabilidad

| Requisito | Regla  | Criterio | Unit   | Component | Integration | E2E     | Estado    |
| --------- | ------ | -------- | ------ | --------- | ----------- | ------- | --------- |
| FR-001    | BR-001 | AC-001   | UT-001 | CT-001    | IT-001      | E2E-001 | Pendiente |
| FR-002    | —      | AC-003   | UT-002 | CT-002    | —           | E2E-002 | Pendiente |

## Control de cambios

### CHG-001: [Nombre del cambio]

| Campo                | Valor                            |
| -------------------- | -------------------------------- |
| Fecha                | YYYY-MM-DD                       |
| Solicitante          | [Nombre o rol]                   |
| Descripción          | [Cambio solicitado]              |
| Motivo               | [Justificación]                  |
| Requisitos afectados | FR-001, AC-001                   |
| Impacto técnico      | [Descripción]                    |
| Impacto en pruebas   | [Descripción]                    |
| Estado               | Propuesto / Aprobado / Rechazado |

## Aprobaciones

| Área       | Responsable    | Estado    | Fecha |
| ---------- | -------------- | --------- | ----- |
| Producto   | [Nombre o rol] | Pendiente | —     |
| Diseño     | [Nombre o rol] | Pendiente | —     |
| Tecnología | [Nombre o rol] | Pendiente | —     |
| Seguridad  | [Nombre o rol] | Pendiente | —     |
| QA         | [Nombre o rol] | Pendiente | —     |

## Agent Instructions

```text
Treat this document as the functional source of truth.

Do not change requirement meaning without adding a CHG entry.

Preserve all requirement, business rule, acceptance criterion, and test IDs.

Ask for clarification only when a missing rule blocks safe implementation.

Implement only APPROVED or explicitly requested requirements.

Update the traceability matrix as tests are created.

Respond to the user in Spanish.
```
