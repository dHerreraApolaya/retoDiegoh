# Especificación: [Nombre de la funcionalidad]

## Metadatos

| Campo                 | Valor                        |
| --------------------- | ---------------------------- |
| ID                    | SPEC-[CAPABILITY]-[NUMBER]   |
| Capacidad             | [Nombre de la capacidad]     |
| Funcionalidad         | [Nombre de la funcionalidad] |
| Estado                | DRAFT                        |
| Versión               | 0.1.0                        |
| Responsable funcional | [Nombre o rol]               |
| Responsable técnico   | [Nombre o rol]               |
| Fecha de creación     | YYYY-MM-DD                   |
| Última actualización  | YYYY-MM-DD                   |
| Historia o iniciativa | [Referencia]                 |

## Resumen

[Describir brevemente qué problema resuelve la funcionalidad y cuál es el resultado esperado.]

## Objetivo

[Definir el resultado funcional y de negocio.]

Ejemplo:

> Permitir que el usuario congele temporalmente una tarjeta activa para impedir nuevas operaciones mientras conserva la posibilidad de reactivarla.

## Contexto

[Explicar por qué se necesita la funcionalidad, cuál es el problema actual y qué actores están involucrados.]

## Resultado esperado

Al finalizar la implementación:

- [Resultado observable 1].
- [Resultado observable 2].
- [Resultado observable 3].

## Actores

| Actor            | Descripción   |
| ---------------- | ------------- |
| Usuario          | [Descripción] |
| Sistema          | [Descripción] |
| Servicio externo | [Descripción] |

## Alcance

Incluye:

- [Elemento incluido].
- [Elemento incluido].
- [Elemento incluido].

## Fuera de alcance

No incluye:

- [Elemento excluido].
- [Elemento excluido].
- [Elemento excluido].

## Supuestos

- [Supuesto funcional o técnico].
- [Supuesto funcional o técnico].

## Dependencias

| Dependencia | Tipo              | Estado                 | Responsable |
| ----------- | ----------------- | ---------------------- | ----------- |
| [API o SDK] | Externa / interna | Disponible / pendiente | [Rol]       |

## Restricciones

- React Native 0.87.1 (según package.json).
- Android e iOS.
- New Architecture.
- [Restricción adicional].

## Flujo principal

1. El usuario [acción].
2. La aplicación [respuesta].
3. El sistema [procesamiento].
4. La aplicación [resultado].
5. El usuario [confirmación o siguiente acción].

## Flujos alternativos

### Alternativa 1: [Nombre]

1. [Paso].
2. [Paso].
3. [Resultado].

### Alternativa 2: [Nombre]

1. [Paso].
2. [Paso].
3. [Resultado].

## Escenarios de error

| Escenario              | Comportamiento esperado |
| ---------------------- | ----------------------- |
| Sin conexión           | [Comportamiento]        |
| Servicio no disponible | [Comportamiento]        |
| Sesión expirada        | [Comportamiento]        |
| Datos inválidos        | [Comportamiento]        |
| Error inesperado       | [Comportamiento]        |

## Requisitos relacionados

Los requisitos detallados se encuentran en:

```text
requirements.md
```

## Diseño técnico

El diseño técnico se encuentra en:

```text
technical-design.md
```

## Plan de pruebas

La estrategia y trazabilidad de pruebas se encuentra en:

```text
test-plan.md
```

## Registro de implementación

El seguimiento de desarrollo se encuentra en:

```text
implementation-log.md
```

## Riesgos

| ID       | Riesgo        | Impacto             | Probabilidad        | Mitigación |
| -------- | ------------- | ------------------- | ------------------- | ---------- |
| RISK-001 | [Descripción] | Alto / Medio / Bajo | Alta / Media / Baja | [Acción]   |

## Preguntas abiertas

| ID    | Pregunta   | Responsable | Estado  |
| ----- | ---------- | ----------- | ------- |
| Q-001 | [Pregunta] | [Rol]       | Abierta |

## Historial de cambios

| Versión | Fecha      | Cambio           | Responsable    |
| ------- | ---------- | ---------------- | -------------- |
| 0.1.0   | YYYY-MM-DD | Creación inicial | [Nombre o rol] |

## Agent Instructions

```text
Read requirements.md, technical-design.md, and test-plan.md before modifying code.

Do not infer missing business rules.

Preserve requirement IDs in implementation and test reports.

Update implementation-log.md after every meaningful change.

Respond to the user in Spanish.

Keep code, identifiers, comments, and technical artifacts in English.
```
