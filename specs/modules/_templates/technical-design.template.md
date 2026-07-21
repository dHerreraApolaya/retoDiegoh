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
src/capabilities/<capability-name>/
```

## Vertical Slice

```text
src/capabilities/<capability-name>/<feature-name>/
```

Estructura esperada:

```text
<feature-name>/
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
├── testing/
└── index.ts
```

Crear únicamente las carpetas necesarias.

## Componentes de la solución

| Componente         | Capa           | Responsabilidad   |
| ------------------ | -------------- | ----------------- |
| `[UseCaseName]`    | Application    | [Responsabilidad] |
| `[PortName]`       | Application    | [Contrato]        |
| `[RepositoryName]` | Infrastructure | [Implementación]  |
| `[ScreenName]`     | Presentation   | [Responsabilidad] |
| `[HookName]`       | Presentation   | [Responsabilidad] |

## Diagrama de dependencias

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

- Screenshot: [decisión].
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

## Accesibilidad

- Roles requeridos: [lista].
- Labels requeridos: [lista].
- Gestión de foco: [descripción].
- Escalado de texto: [descripción].
- Lectura de errores: [descripción].

## Rendimiento

- Estrategia de lista: [FlatList / SectionList / otra].
- Paginación: [decisión].
- Imágenes: [estrategia].
- Memoización: [decisión y justificación].
- Operaciones pesadas: [ubicación].
- Métricas a observar: [lista].

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
src/capabilities/<capability>/<feature>/
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
