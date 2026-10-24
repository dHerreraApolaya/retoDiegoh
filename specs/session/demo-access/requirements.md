# Requisitos

| ID      | Resultado requerido                                                | Escenario                                  |
| ------- | ------------------------------------------------------------------ | ------------------------------------------ |
| FR-001  | Arrancar siempre en Login sin restaurar sesión                     | SESSION-01, SESSION-07                     |
| FR-002  | Acceso de prueba explícito sin credenciales ni Firebase            | SESSION-02                                 |
| FR-003  | Expirar exactamente a cinco minutos desde el inicio                | SESSION-03                                 |
| FR-004  | Conservar en background antes del vencimiento; revalidar al volver | SESSION-04, SESSION-05                     |
| FR-005  | Cerrar y limpiar datos de usuario, sin acceso mediante Atrás       | SESSION-06                                 |
| FR-006  | Admitir una sesión nueva sin reutilizar el plazo anterior          | SESSION-07                                 |
| SEC-001 | No persistir credenciales/sesión ni pasar secretos por navegación  | SESSION-01, SESSION-07, revisión de código |
| SEC-002 | Fallar cerrado con reloj inválido/regresivo; liberar recursos      | SESSION-08                                 |
| ACC-001 | Acciones identificables por roles/nombres, IDs estables para E2E   | SESSION-02, SESSION-06                     |
| NFR-001 | Pruebas de resultados; sin snapshots ni jerarquías internas        | Todas                                      |

FR-003 y FR-004 son decisiones explícitas del usuario, no supuestos de Firebase.
No hay operación de restauración ni fallo de red de sesión en esta entrega.
