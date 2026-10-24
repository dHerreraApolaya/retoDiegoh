# Diseño técnico: [Nombre de la funcionalidad]

## Metadatos

| Campo            | Valor          |
| ---------------- | -------------- |
| Estado           | DRAFT          |
| Versión          | 0.1.0          |
| Responsable      | [Nombre o rol] |
| Fecha            | YYYY-MM-DD     |
| Spec relacionada | [SPEC-ID]      |

## Resumen de la solución

[Describir brevemente cómo se implementará la funcionalidad.]

## Capacidad

```text
src/modules/features/<feature-name>/
```

## Vertical Slice

```text
src/modules/features/<feature-name>/
```

Estructura esperada:

```text
<capability-name>/
├── presentation/
│   ├── screens/
│   ├── components/
│   ├── hooks/
│   ├── navigation/
│   └── view-models/
├── application/
│   ├── use-cases/
│   ├── ports/
│   └── dto/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   ├── services/
│   ├── events/
│   └── errors/
├── infrastructure/
│   ├── api/
│   ├── repositories/
│   ├── storage/
│   ├── native/
│   └── mappers/
└── index.ts
```

Crear únicamente las capas necesarias dentro de cada feature. Mantener su política
y contratos con su propietario; coordinar las funcionalidades desde src/app usando
APIs públicas. Las pruebas viven en `src/modules/__tests__/<feature-name>`, fuera
del árbol productivo del feature.
Ver docs/architecture/architecture.md y ADR-002. Mantener los tokens en
src/design/tokens.

## Componentes de la solución

Aplicar [naming conventions](../../../docs/engineering/naming-conventions.md):
el nombre expresa el concepto, la responsabilidad y la capa, sin sufijos
genéricos como Manager, Helper o Impl.

| Componente         | Capa           | Responsabilidad   |
| ------------------ | -------------- | ----------------- |
| `[UseCaseName]`    | Application    | [Responsabilidad] |
| `[PortName]`       | Application    | [Contrato]        |
| `[RepositoryName]` | Infrastructure | [Implementación]  |
| `[ScreenName]`     | Presentation   | [Responsabilidad] |
| `[HookName]`       | Presentation   | [Responsabilidad] |

## Flujo de ejecución (no dirección de imports)

El adapter implementa el port definido por aplicación. El caso de uso depende
del port, nunca de la clase concreta del adapter. La composición se realiza en
src/app mediante factories públicas de la capacidad.

```text
Screen
  -> Presentation Hook
    -> Use Case
      -> Port
        -> Infrastructure Adapter
          -> API / Native Module / Storage
```

## Modelo de dominio

### Entidades

#### `[EntityName]`

Responsabilidad:

[Descripción.]

Atributos:

| Campo    | Tipo         | Regla       |
| -------- | ------------ | ----------- |
| `id`     | `[EntityId]` | Obligatorio |
| `status` | `[Status]`   | [Regla]     |

### Value Objects

#### `[ValueObjectName]`

Invariantes:

- [Invariante].
- [Invariante].

### Reglas relacionadas

- BR-001
- BR-002

## Casos de uso

### `[UseCaseName]`

**Requisitos relacionados**

- FR-001
- AC-001

**Entrada**

```ts
export type UseCaseInput = {
  readonly id: EntityId;
};
```

**Salida**

```ts
export type UseCaseResult =
  | {
      readonly status: 'success';
      readonly data: DomainEntity;
    }
  | {
      readonly status: 'failure';
      readonly error: UseCaseError;
    };
```

**Dependencias**

```ts
export interface RequiredPort {
  execute(input: PortInput): Promise<PortResult>;
}
```

## Contratos externos

### API

| Elemento      | Valor                     |
| ------------- | ------------------------- |
| Método        | GET / POST / PUT / DELETE |
| Endpoint      | `/resource`               |
| Timeout       | [duración]                |
| Autenticación | [tipo]                    |

Request:

```ts
export type RequestDto = {
  readonly field: string;
};
```

Response:

```ts
export type ResponseDto = {
  readonly field: string;
};
```

Validación:

- Validar toda respuesta externa.
- No consumir DTOs directamente en presentación.
- Traducir errores externos.

### Storage

| Dato   | Clasificación          | Storage          | Duración   | Eliminación |
| ------ | ---------------------- | ---------------- | ---------- | ----------- |
| [Dato] | Sensible / no sensible | Secure / regular | [Duración] | [Momento]   |

### Native Integration

Definir si aplica:

| Campo              | Decisión            |
| ------------------ | ------------------- |
| Tipo               | Turbo Native Module |
| Codegen            | Sí                  |
| Promise            | Sí / No             |
| Events             | Sí / No             |
| Callback           | Sí / No             |
| Synchronous method | Sí / No             |

Contrato propuesto:

```ts
export interface Spec extends TurboModule {
  performAction(input: NativeInput): Promise<NativeResult>;

  readonly onStateChanged: CodegenTypes.EventEmitter<NativeStateEvent>;
}
```

## Estado de presentación

```ts
export type FeatureViewState =
  | { readonly status: 'idle' }
  | { readonly status: 'loading' }
  | { readonly status: 'success'; readonly data: FeatureUiModel }
  | { readonly status: 'empty' }
  | { readonly status: 'error'; readonly message: string };
```

## Componentes visuales

| Componente         | Tipo              | Responsabilidad       |
| ------------------ | ----------------- | --------------------- |
| `[FeatureScreen]`  | Screen            | Composición principal |
| `[FeatureContent]` | Feature component | Contenido             |
| `[FeatureItem]`    | List item         | Elemento repetido     |
| `[Button]`         | Design system     | Acción                |

## Navegación

```ts
export type FeatureNavigatorParamList = {
  FeatureScreen: {
    readonly entityId: string;
  };
};
```

No pasar entidades completas mediante navegación.

## Manejo de errores

| Error           | Capa de origen | Traducción       | Comportamiento UI |
| --------------- | -------------- | ---------------- | ----------------- |
| `[DomainError]` | Domain         | No aplica        | [Comportamiento]  |
| `[ApiError]`    | Infrastructure | `[FeatureError]` | [Comportamiento]  |
| `[NativeError]` | Native         | `[FeatureError]` | [Comportamiento]  |

## Seguridad

### Clasificación de datos

[Describir.]

### Almacenamiento

[Describir.]

### Protección visual

- Screenshot Android: [FLAG_SECURE y evidencia por versión/dispositivo].
- Screenshot iOS: [mitigaciones, límites y criterio de aceptación; la notificación
  posterior a captura no demuestra prevención].
- App switcher: [decisión].
- Screen recording: [decisión].

### Timeout

- Fuente de tiempo: `TimeProvider`.
- Expiración: [duración].
- Revalidación al volver de background: [comportamiento].

### Logs

Eventos permitidos:

- [Evento técnico].

Campos prohibidos:

- [Campo sensible].

### Trazabilidad de seguridad

- Amenazas relacionadas: [T-## en docs/security/threat-model.md].
- Riesgos Mobile Top 10 y controles MASVS aplicables: [IDs y justificación].
- Procedimientos MASTG y evidencia requerida: [referencias].
- Datos que cruzan JS/nativo, persistencia y eliminación: [contrato].
- Estado: planned / implemented / verified / not-applicable / accepted-risk.
- Riesgo residual y responsable de aceptación: [si aplica, sin inventar aprobación].

## Accesibilidad

- Roles requeridos: [lista].
- Labels requeridos: [lista].
- Gestión de foco: [descripción].
- Escalado de texto: [descripción].
- Lectura de errores: [descripción].

## Rendimiento

- Tamaños de entrada: [definir n/m, volumen esperado y límite máximo].
- Complejidad temporal: [Big O, peor caso/promedio/amortizado y supuestos].
- Espacio auxiliar: [Big O, copias, índices, recursión y memoria retenida].
- Alternativas y tradeoffs: [tiempo, memoria, legibilidad y costo de mantener índices].
- Límites de recursos: [tamaño de lote, concurrencia, reintentos, caché y cancelación].
- Acceso remoto: [cantidad de requests, payload y lecturas/índices del backend].
- Estrategia de lista: [FlatList / SectionList / otra].
- Paginación: [decisión].
- Imágenes: [estrategia].
- Memoización: [decisión y justificación].
- Operaciones pesadas: [ubicación].
- Métricas a observar: [lista].
- Presupuesto y evidencia: [latencia/memoria objetivo, tamaños sintéticos,
  dispositivo/build y resultados medidos; indicar pendiente si no se ejecutó].

Aplicar [algorithmic complexity guidance](../../../docs/engineering/coding-standards.md#algorithmic-complexity-and-resource-bounds).
Completar proporcionalmente cuando existan colecciones crecientes u operaciones
críticas; usar N/A con motivo cuando no aplique. React Compiler y la memoización
no cambian el costo asintótico del algoritmo cuando se ejecuta.

## Analytics

```ts
export const FeatureAnalyticsEvents = {
  screenViewed: 'feature_screen_viewed',
  actionSubmitted: 'feature_action_submitted',
  actionSucceeded: 'feature_action_succeeded',
  actionFailed: 'feature_action_failed',
} as const;
```

No incluir información sensible.

## Decisiones arquitectónicas

### Principios y patrones aplicados

- Requisito o límite que justifica el patrón: [descripción].
- Solución más simple considerada y decisión: [patrón o función simple].
- SOLID: [responsabilidades, contratos y dirección de dependencias].
- KISS: [complejidad que se evita].
- DRY: [regla con fuente única y duplicación intencional, si aplica].
- Evidencia de comportamiento: [pruebas relacionadas].

Seguir [design principles](../../../docs/engineering/design-principles.md).
No introducir un patrón solo para completar esta sección; usar ADR cuando la
decisión afecte límites o políticas relevantes.

### ADR-001: [Título]

**Contexto**

[Problema.]

**Decisión**

[Decisión tomada.]

**Alternativas consideradas**

1. [Alternativa].
2. [Alternativa].

**Consecuencias**

- Positivas: [lista].
- Negativas: [lista].

## Archivos estimados

```text
src/modules/features/<feature>/
├── application/
├── domain/
├── infrastructure/
├── presentation/
└── testing/
```

## Plan de implementación

1. Crear modelos de dominio.
2. Crear contratos de aplicación.
3. Implementar casos de uso.
4. Implementar adapters.
5. Crear presentación.
6. Añadir accesibilidad.
7. Añadir seguridad.
8. Añadir pruebas.
9. Añadir IDs E2E.
10. Ejecutar validaciones.

## Riesgos técnicos

| ID       | Riesgo   | Mitigación   |
| -------- | -------- | ------------ |
| TECH-001 | [Riesgo] | [Mitigación] |

## Agent Instructions

```text
Follow AGENTS.md.

Implement the smallest architecture that satisfies the approved requirements.

Do not create empty layers or speculative abstractions.

Keep domain and application independent from React Native.

Use dependency injection at architecture boundaries.

Use Turbo Native Modules and Codegen for new native integrations.

Keep Android and iOS contracts equivalent.

Update this document when implementation differs from the approved design.

Respond to the user in Spanish.
```
