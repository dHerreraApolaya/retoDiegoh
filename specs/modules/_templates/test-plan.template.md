# Plan de pruebas: [Nombre de la funcionalidad]

## Metadatos

| Campo                | Valor          |
| -------------------- | -------------- |
| Estado               | DRAFT          |
| Versión              | 0.1.0          |
| Responsable          | [Nombre o rol] |
| Spec relacionada     | [SPEC-ID]      |
| Última actualización | YYYY-MM-DD     |

## Objetivo

Validar que la funcionalidad cumple los requisitos funcionales, técnicos, de seguridad, accesibilidad y rendimiento definidos.

## Alcance de pruebas

Incluye:

- Reglas de dominio.
- Casos de uso.
- Mappers.
- Hooks.
- Componentes.
- Pantallas.
- Adapters.
- Integraciones nativas.
- Flujos críticos E2E.
- Casos de error.
- Regresiones.

No incluye:

- [Elemento fuera de alcance].

## Estrategia

```text
Static analysis
  -> Unit tests
    -> Hook and component tests
      -> Integration tests
        -> E2E tests
```

## Pruebas unitarias

### UT-001: [Nombre]

**Requisitos relacionados**

- FR-001
- BR-001
- AC-001

**Objetivo**

[Comportamiento a validar.]

**Unidad**

`[ClassOrFunctionName]`

**Preparación**

- [Stub o fixture].
- [Dependencia].

**Acción**

[Acción realizada.]

**Resultado esperado**

[Resultado.]

**Archivo esperado**

```text
[ClassOrFunctionName].test.ts
```

---

### UT-002: [Nombre]

[Repetir estructura.]

## Pruebas de hooks

### HT-001: [Nombre]

**Hook**

`useFeatureName`

**Validar**

- Estado inicial.
- Estado de carga.
- Estado de éxito.
- Estado de error.
- Reintento.
- Cleanup.
- Cancelación.

**Archivo esperado**

```text
useFeatureName.test.ts
```

## Pruebas de componentes

### CT-001: [Nombre]

**Componente**

`FeatureComponent`

**Requisitos relacionados**

- FR-001
- ACC-001
- AC-001

**Validar**

- Contenido visible.
- Rol accesible.
- Label accesible.
- Estado deshabilitado.
- Interacción.
- Mensaje de error.

**Selección preferida**

1. Role.
2. Accessible name.
3. Visible text.
4. Placeholder.
5. `testID`.

**Archivo esperado**

```text
FeatureComponent.test.tsx
```

## Pruebas de integración

### IT-001: [Nombre]

**Límite validado**

`Repository + API client`

**Requisitos relacionados**

- FR-001
- NFR-001

**Validar**

- Request enviado.
- Response validado.
- Mapping.
- Error técnico.
- Timeout.
- Cancelación.

**Archivo esperado**

```text
RemoteFeatureRepository.integration.test.ts
```

### IT-002: Integración nativa

**Validar**

- Paridad Android/iOS.
- Error mapping.
- Listener cleanup.
- Cancelación.
- Invalidación.
- Background/foreground.

## Pruebas E2E

### E2E-001: [Nombre del recorrido crítico]

**Requisitos relacionados**

- FR-001
- AC-001

```gherkin
Dado que [contexto]
Cuando [acción]
Y [acción adicional]
Entonces [resultado]
Y [resultado adicional]
```

**Datos de prueba**

- [Dato no sensible].
- [Estado inicial].

**IDs utilizados**

- `[capability].[flow].screen`
- `[capability].[flow].primary-action`
- `[capability].[flow].success-message`

**Archivo esperado**

```text
<feature-name>.e2e.ts
```

### E2E-002: [Escenario de error]

```gherkin
Dado que [contexto]
Cuando [falla una dependencia]
Entonces [se muestra un error]
Y [el usuario puede reintentar]
```

## IDs E2E

Crear:

```ts
export const FeatureTestIds = {
  screen: '<capability>.<flow>.screen',
  loading: '<capability>.<flow>.loading',
  emptyState: '<capability>.<flow>.empty-state',
  errorMessage: '<capability>.<flow>.error-message',
  retryButton: '<capability>.<flow>.retry-button',
  primaryAction: '<capability>.<flow>.primary-action',
  successMessage: '<capability>.<flow>.success-message',
  item: (publicId: string) => `<capability>.<flow>.item.${publicId}`,
} as const;
```

Reglas:

- Usar minúsculas.
- Usar `kebab-case` por segmento.
- Separar segmentos mediante punto.
- No usar índices.
- No usar contenido traducido.
- No usar datos privados.
- No reutilizar IDs en elementos simultáneos.

## Pruebas de seguridad

### ST-001: Almacenamiento seguro

Validar:

- El dato se guarda mediante secure storage.
- El dato se elimina al cerrar sesión.
- El dato no queda en almacenamiento regular.

### ST-002: Logs

Validar que no se registren:

- Tokens.
- PIN.
- Contraseñas.
- Cabeceras de autorización.
- Datos personales completos.

### ST-003: Protección de pantalla

Validar:

- Protección al ingresar.
- Limpieza al salir.
- Comportamiento en app switcher.
- Comportamiento en background.

### ST-004: Timeout

Validar:

- Expiración en foreground.
- Expiración después de background.
- Cambio de fecha.
- Reanudación.
- Logout.
- Limpieza de datos.

## Pruebas de accesibilidad

### AT-001: Lector de pantalla

Validar:

- Orden de lectura.
- Roles.
- Labels.
- Estados.
- Mensajes de error.

### AT-002: Modal

Validar:

- Foco inicial.
- Navegación dentro del modal.
- Retorno de foco al cerrar.

### AT-003: Escalado de texto

Validar:

- Tamaño de texto aumentado.
- Contenido no truncado.
- Acciones operables.

## Pruebas de rendimiento

### PT-001: Lista

Validar:

- Keys estables.
- Virtualización.
- Carga incremental.
- Comportamiento con volumen esperado.

### PT-002: Renderizado

Validar cuando corresponda:

- Renders innecesarios.
- Cálculo costoso.
- Memoria.
- Tiempo de interacción.

No crear pruebas de rendimiento sin una métrica o riesgo definido.

## Matriz de cobertura

| ID de prueba | Tipo          | Requisito | Automatizada | Estado    | Archivo                          |
| ------------ | ------------- | --------- | ------------ | --------- | -------------------------------- |
| UT-001       | Unit          | FR-001    | Sí           | Pendiente | `UseCase.test.ts`                |
| CT-001       | Component     | AC-001    | Sí           | Pendiente | `Component.test.tsx`             |
| IT-001       | Integration   | FR-001    | Sí           | Pendiente | `Repository.integration.test.ts` |
| E2E-001      | E2E           | AC-001    | Sí           | Pendiente | `feature.e2e.ts`                 |
| AT-001       | Accessibility | ACC-001   | Parcial      | Pendiente | [Referencia]                     |
| ST-001       | Security      | SEC-001   | Sí           | Pendiente | [Referencia]                     |

## Comandos de validación

```bash
yarn typecheck
yarn lint
yarn test
yarn test:unit
yarn test:integration
yarn e2e:android
yarn e2e:ios
```

Ajustar los comandos a la configuración real del proyecto.

## Evidencias

| Validación        | Fecha | Resultado | Evidencia |
| ----------------- | ----- | --------- | --------- |
| Typecheck         | —     | Pendiente | —         |
| Lint              | —     | Pendiente | —         |
| Unit tests        | —     | Pendiente | —         |
| Integration tests | —     | Pendiente | —         |
| Android E2E       | —     | Pendiente | —         |
| iOS E2E           | —     | Pendiente | —         |
| Accessibility     | —     | Pendiente | —         |
| Security review   | —     | Pendiente | —         |

## Agent Instructions

```text
Create tests from approved requirements and acceptance criteria.

Map every test to at least one requirement or acceptance criterion.

Prefer behavior-focused tests.

Do not test private implementation details.

Use semantic accessibility queries before test IDs.

Use stable E2E IDs without sensitive data.

Add a regression test for every bug fix.

Update the coverage matrix and evidence table after running validations.

Do not mark a test as passed unless it was executed.

Respond to the user in Spanish.
```
