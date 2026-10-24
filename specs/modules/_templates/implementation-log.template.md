# Registro de implementación: [Nombre de la funcionalidad]

## Estado actual

| Campo                | Valor          |
| -------------------- | -------------- |
| Estado               | NOT_STARTED    |
| Spec                 | [SPEC-ID]      |
| Rama                 | [branch-name]  |
| Responsable          | [Nombre o rol] |
| Inicio               | —              |
| Última actualización | YYYY-MM-DD     |

Estados permitidos:

```text
NOT_STARTED
IN_PROGRESS
BLOCKED
IMPLEMENTED
VALIDATED
CANCELLED
```

## Resumen de avance

[Resumen breve del estado actual.]

## Checklist de implementación

### Arquitectura

- [ ] Capacidad identificada.
- [ ] Vertical slice creado.
- [ ] Límites de dependencia respetados.
- [ ] Dominio independiente de frameworks.
- [ ] Puertos definidos.
- [ ] Adapters implementados.
- [ ] API pública de la capacidad actualizada.

### Presentación

- [ ] Pantalla implementada.
- [ ] Componentes implementados.
- [ ] Hook o view model implementado.
- [ ] Loading implementado.
- [ ] Empty state implementado.
- [ ] Error state implementado.
- [ ] Retry implementado.
- [ ] Success state implementado.

### Seguridad

- [ ] Datos clasificados.
- [ ] Secure storage implementado cuando aplica.
- [ ] Logs revisados.
- [ ] Screenshot policy implementada.
- [ ] App switcher protegido.
- [ ] Timeout implementado.
- [ ] Logout limpia datos.

### Accesibilidad

- [ ] Roles.
- [ ] Labels.
- [ ] Estados.
- [ ] Área táctil.
- [ ] Escalado de texto.
- [ ] Gestión de foco.
- [ ] TalkBack validado.
- [ ] VoiceOver validado.

### Performance

- [ ] Keys estables.
- [ ] Lista virtualizada.
- [ ] Imágenes optimizadas.
- [ ] Sin trabajo pesado en render.
- [ ] Memoización justificada.
- [ ] Operaciones nativas fuera del hilo principal.

### Testing

- [ ] Unit tests.
- [ ] Hook tests.
- [ ] Component tests.
- [ ] Integration tests.
- [ ] Native tests.
- [ ] E2E IDs.
- [ ] Android E2E.
- [ ] iOS E2E.
- [ ] Regression tests.

## Requisitos implementados

| Requisito | Estado    | Archivos | Pruebas | Observaciones |
| --------- | --------- | -------- | ------- | ------------- |
| FR-001    | Pendiente | —        | —       | —             |
| FR-002    | Pendiente | —        | —       | —             |
| SEC-001   | Pendiente | —        | —       | —             |
| ACC-001   | Pendiente | —        | —       | —             |

Estados:

```text
PENDING
IN_PROGRESS
IMPLEMENTED
VALIDATED
BLOCKED
NOT_APPLICABLE
```

## Cambios realizados

### YYYY-MM-DD — [Título del cambio]

**Objetivo**

[Qué se buscó implementar.]

**Requisitos relacionados**

- FR-001
- AC-001

**Archivos creados**

```text
src/path/NewFile.ts
src/path/NewFile.test.ts
```

**Archivos modificados**

```text
src/path/ExistingFile.ts
```

**Decisiones**

- [Decisión].
- [Decisión].

**Pruebas agregadas**

- UT-001
- CT-001
- E2E-001

**Validaciones ejecutadas**

```text
pnpm check:docs: [resultado observado / no ejecutado]
pnpm typecheck: [resultado observado / no ejecutado]
pnpm lint: [resultado observado / no ejecutado]
pnpm test --runInBand: [resultado observado / no ejecutado]
```

**Pendientes**

- [Pendiente].

## Desviaciones del diseño

### DEV-001: [Nombre]

| Campo               | Valor                |
| ------------------- | -------------------- |
| Fecha               | YYYY-MM-DD           |
| Diseño original     | [Descripción]        |
| Implementación real | [Descripción]        |
| Motivo              | [Justificación]      |
| Impacto             | [Impacto]            |
| Aprobación          | Pendiente / Aprobada |

Toda desviación debe actualizar también `technical-design.md` cuando sea aprobada.

## Bloqueantes

| ID        | Bloqueante    | Impacto   | Responsable | Estado  |
| --------- | ------------- | --------- | ----------- | ------- |
| BLOCK-001 | [Descripción] | [Impacto] | [Rol]       | Abierto |

## Deuda técnica

| ID       | Descripción   | Motivo   | Riesgo              | Acción futura |
| -------- | ------------- | -------- | ------------------- | ------------- |
| DEBT-001 | [Descripción] | [Motivo] | Alto / Medio / Bajo | [Acción]      |

No registrar funcionalidad incompleta como deuda técnica para cerrar una tarea.

## Bugs encontrados

### BUG-001: [Nombre]

| Campo               | Valor                          |
| ------------------- | ------------------------------ |
| Descripción         | [Descripción]                  |
| Severidad           | Blocker / High / Medium / Low  |
| Requisito afectado  | FR-001                         |
| Causa raíz          | [Descripción]                  |
| Corrección          | [Descripción]                  |
| Prueba de regresión | UT-003 / E2E-003               |
| Estado              | Abierto / Corregido / Validado |

## IDs E2E implementados

| ID lógico      | Valor                            | Ubicación          |
| -------------- | -------------------------------- | ------------------ |
| Screen         | `capability.flow.screen`         | `[ScreenName].tsx` |
| Primary action | `capability.flow.primary-action` | `[Component].tsx`  |
| Error message  | `capability.flow.error-message`  | `[Component].tsx`  |

## Validaciones

| Comando o revisión | Resultado | Fecha | Observación |
| ------------------ | --------- | ----- | ----------- |
| Typecheck          | Pendiente | —     | —           |
| Lint               | Pendiente | —     | —           |
| Unit tests         | Pendiente | —     | —           |
| Integration tests  | Pendiente | —     | —           |
| Android E2E        | Pendiente | —     | —           |
| iOS E2E            | Pendiente | —     | —           |
| Accessibility      | Pendiente | —     | —           |
| Security           | Pendiente | —     | —           |

Resultados permitidos:

```text
PENDING
PASS
FAIL
NOT_EXECUTED
NOT_APPLICABLE
```

## Resultado final

### Requisitos completados

- [Requisito].

### Requisitos pendientes

- [Requisito].

### Riesgos residuales

- [Riesgo].

### Recomendación

READY_FOR_REVIEW / REQUIRES_CHANGES / BLOCKED

## Agent Instructions

```text
Update this file after every meaningful implementation step.

Never mark requirements as implemented without code evidence.

Never mark validations as PASS unless commands or reviews were executed.

Record created and modified files.

Record requirement and test IDs.

Document blockers, deviations, and remaining risks.

Do not hide incomplete work as technical debt.

Respond to the user in Spanish.
```
