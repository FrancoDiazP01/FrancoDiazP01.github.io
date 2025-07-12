# Documentación del Proyecto Tidetrack

## Estructura de Documentación

Esta carpeta contiene la documentación completa del proyecto Tidetrack, organizada de la siguiente manera:

- `requirements/`: Requisitos y especificaciones del proyecto
- `decisions/`: Decisiones de diseño y arquitectura
- `prompts/`: Registro de prompts y requerimientos
- `api/`: Documentación de la API
- `frontend/`: Documentación del frontend
- `backend/`: Documentación del backend
- `database/`: Documentación de la base de datos
- `security/`: Consideraciones de seguridad
- `deployment/`: Guías de despliegue

## Convenciones

- Cada archivo debe tener fecha en su nombre (YYYY-MM-DD)
- Los archivos deben estar en formato Markdown
- Mantener un registro cronológico de los cambios
- Incluir referencias a commits relevantes cuando sea posible

## Índice de Documentación

### Requisitos
- [Requisitos Iniciales](requirements/2025-07-12-requisitos-iniciales.md)
- [Requisitos de Datos Simulados](requirements/2025-07-12-requisitos-datos-simulados.md)

### Decisiones de Diseño
- [Estructura de Datos](decisions/2025-07-12-estructura-datos.md)
- [Arquitectura del Backend](decisions/2025-07-12-arquitectura-backend.md)

### API
- [Endpoints](api/2025-07-12-endpoints.md)
- [Estructura de Respuestas](api/2025-07-12-respuestas.md)

### Frontend
- [Estructura de Componentes](frontend/2025-07-12-componentes.md)
- [Estilos y Temas](frontend/2025-07-12-estilos.md)

### Backend
- [Servicios](backend/2025-07-12-servicios.md)
- [Middleware](backend/2025-07-12-middleware.md)

### Base de Datos
- [Estructura de Datos](database/2025-07-12-estructura-datos.md)
- [Migración a Google Sheets](database/2025-07-12-migracion-google-sheets.md)

## Guía de Uso

1. Cada vez que se reciba un nuevo requerimiento, crear un archivo en `prompts/`
2. Documentar las decisiones de diseño en `decisions/`
3. Mantener actualizada la documentación de la API en `api/`
4. Actualizar la documentación del frontend y backend según corresponda
5. Documentar cualquier cambio en la estructura de datos en `database/`
