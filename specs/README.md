# Especificaciones del proyecto

Esta carpeta contiene las especificaciones funcionales y técnicas de las capacidades desarrolladas en la aplicación.

## Objetivo

Las especificaciones permiten:

- Definir el comportamiento antes de implementar.
- Mantener trazabilidad entre requisitos, código y pruebas.
- Reducir interpretaciones ambiguas.
- Registrar decisiones técnicas.
- Controlar cambios de alcance.
- Facilitar el trabajo asistido por agentes de IA.
- Mantener evidencia de la implementación realizada.

## Estructura

La documentación de cada funcionalidad debe almacenarse en:

```text
specs/<capability>/<feature-name>/
```

Ejemplo:

```text
specs/cards/card-freezing/
├── spec.md
├── requirements.md
├── technical-design.md
├── test-plan.md
└── implementation-log.md
```

Las plantillas existentes permanecen en `specs/modules/_templates/`.
Esta organización documental no determina otra jerarquía de capas en el código:
ver [arquitectura](../docs/architecture/architecture.md). Los lineamientos globales
viven en [docs](../docs/README.md), y las skills en `.agents/skills`.

## Convenciones de nombres

Usar `kebab-case` para carpetas:

```text
card-freezing
pin-code-change
session-timeout
secure-login
```

La carpeta superior representa la capacidad de negocio:

```text
cards
authentication
transfers
payments
customer-profile
```

## Idioma

- Los requisitos, criterios de aceptación y seguimiento funcional deben escribirse en español.
- Los nombres técnicos, código, archivos, clases, funciones y contratos deben mantenerse en inglés.
- Las instrucciones dirigidas al agente pueden escribirse en inglés para reducir ambigüedad y optimizar tokens.
- El agente debe responder al usuario en español.

## Uso proporcional

Una nueva funcionalidad usa las plantillas pertinentes. Una corrección documental
o de configuración no requiere crear cinco archivos de spec ni una aprobación
adicional. Los estados reflejan revisiones reales: la autorización existente del
usuario puede cubrir trabajo rutinario; no inventar una aprobación ni declarar
VALIDATED sin ejecutar sus comprobaciones.

Para funcionalidad sensible, relacionar SEC-### con el
[modelo de amenazas](../docs/security/threat-model.md), la
[matriz OWASP](../docs/security/owasp-matrix.md), controles MASVS aplicables y
procedimientos MASTG concretos. Registrar evidencia por plataforma y riesgo residual.

## Flujo de trabajo

Una especificación debe avanzar por los siguientes estados:

```text
DRAFT
IN_REVIEW
APPROVED
IN_PROGRESS
IMPLEMENTED
VALIDATED
CANCELLED
```

### DRAFT

La especificación se encuentra en elaboración.

### IN_REVIEW

El alcance está siendo revisado por producto, diseño o tecnología.

### APPROVED

Los requisitos y el diseño fueron aprobados para implementación.

### IN_PROGRESS

La implementación se encuentra en desarrollo.

### IMPLEMENTED

El código fue desarrollado y las pruebas automatizadas fueron agregadas.

### VALIDATED

La funcionalidad fue validada contra sus criterios de aceptación.

### CANCELLED

La especificación fue descartada o reemplazada.

## Reglas

- No iniciar una implementación con requisitos críticos ambiguos.
- Cada requisito debe tener un identificador estable.
- Cada criterio de aceptación debe estar relacionado con un requisito.
- Cada requisito debe relacionarse con al menos una prueba.
- Cada flujo crítico debe tener IDs E2E.
- Todo cambio de alcance debe quedar registrado.
- Toda desviación entre diseño e implementación debe documentarse.
- Todo bug corregido debe incorporar una prueba de regresión.
- No marcar una especificación como validada sin evidencia.

## Identificadores

Usar los siguientes prefijos:

```text
FR-###   Requisito funcional
NFR-###  Requisito no funcional
BR-###   Regla de negocio
AC-###   Criterio de aceptación
SEC-###  Requisito de seguridad
ACC-###  Requisito de accesibilidad
PERF-### Requisito de rendimiento
UT-###   Prueba unitaria
IT-###   Prueba de integración
CT-###   Prueba de componente
E2E-###  Prueba end-to-end
ADR-###  Decisión arquitectónica
CHG-###  Cambio de alcance
```

Ejemplo de trazabilidad:

```text
FR-001
├── BR-001
├── AC-001
├── UT-001
├── CT-001
└── E2E-001
```

## Definition of Ready

Una especificación está lista para desarrollo cuando:

- El objetivo está definido.
- El alcance y fuera de alcance están claros.
- Los actores fueron identificados.
- Los requisitos tienen IDs.
- Los criterios de aceptación son comprobables.
- Los diseños necesarios están disponibles.
- Los contratos externos fueron revisados.
- Los riesgos de seguridad fueron evaluados.
- Los requisitos de accesibilidad fueron definidos.
- Los escenarios de error fueron identificados.
- Las dependencias y bloqueantes están registrados.
- El diseño técnico fue revisado.

## Definition of Done

Una especificación está terminada cuando:

- Todos los requisitos aprobados fueron implementados.
- Los criterios de aceptación fueron validados.
- Las pruebas unitarias fueron agregadas.
- Las pruebas de integración requeridas fueron agregadas.
- Los IDs E2E fueron implementados.
- Los recorridos críticos cuentan con pruebas E2E.
- La accesibilidad fue validada.
- La seguridad fue revisada.
- No existen desviaciones sin documentar.
- El registro de implementación fue actualizado.
- Typecheck, lint y pruebas relacionadas finalizaron correctamente.
