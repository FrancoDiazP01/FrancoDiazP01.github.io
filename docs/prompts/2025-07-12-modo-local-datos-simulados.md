# Modo Local y Datos Simulados

## Fecha
2025-07-12

## Prompt Original

```
IMPORTANTE: Antes de conectar con la API de Google Sheets o desplegar el proyecto, quiero trabajar **en modo local**. El objetivo es desarrollar todas las funcionalidades de la app usando datos simulados (mock data o archivos locales .json) para validar la lógica del backend y el flujo de datos con el frontend.

Esto significa que:

1. No quiero autenticarme con Google Cloud todavía.  
2. No quiero hacer conexiones reales con Google Sheets por ahora.  
3. Quiero que me ayudes a crear funciones, endpoints y vistas como si ya estuviera la base de datos conectada, pero usando datos locales temporales.
4. Más adelante, vamos a reemplazar todo eso por funciones reales conectadas con Google Sheets API.

Por lo tanto:
- Usá un archivo `data/movimientos.json` para simular ingresos, gastos y presupuestos.
- Ayudame a estructurar las funciones de lectura, escritura, actualización y borrado sobre ese archivo.
- Documentá todo el código para que luego pueda hacer el "swap" fácilmente con la API real.
- Asegurate de que todas las rutas del backend estén funcionando localmente (por ejemplo, en `localhost:3000`), y que el frontend se conecte a ellas mediante fetch/AJAX o lo que corresponda.

También quiero que, cuando estemos listos, me prepares la guía paso a paso para:
- Activar Google Sheets API.
- Crear credenciales.
- Usar `googleapis` o `node-google-spreadsheet`.
- Integrar todo esto de forma segura con `.env`.

Pero por ahora: **modo local, mock data, y código comentado**. Seguimos construyendo la estructura, y más adelante conectamos todo.
```

## Implementación

### Estructura de Datos
- Archivo `data/movimientos.json` creado con estructura inicial
- Contiene categorías, movimientos y presupuestos
- Datos de ejemplo incluidos

### Servicio de Datos Simulados
- Clase `MockDataService` creada en `src/services/mock-data-service.js`
- Implementa CRUD completo para cada entidad
- Manejo de archivos JSON
- Generación automática de IDs
- Filtros para consultas

### API
- Endpoints implementados en `src/server.js`
- Rutas para categorías, movimientos y presupuestos
- Respuestas consistentes con status codes
- Manejo de errores

### Características Implementadas
- CRUD completo para categorías
- CRUD completo para movimientos con filtros
- CRUD completo para presupuestos
- Manejo de datos simulados
- Documentación completa del código

### Próximos Pasos
1. Implementar el frontend que consuma estas APIs
2. Crear la documentación de la API
3. Implementar la autenticación
4. Agregar más funcionalidades según requerimientos

## Referencias
- Commit inicial: [COMMIT_HASH]
- Documentación relacionada:
  - [Estructura de Datos](../database/2025-07-12-estructura-datos.md)
  - [API Endpoints](../api/2025-07-12-endpoints.md)
  - [Servicios](../backend/2025-07-12-servicios.md)
