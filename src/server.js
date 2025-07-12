require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const MockDataService = require('./services/mock-data-service');
const path = require('path');

// Inicializar el servicio de datos simulados
const mockData = new MockDataService();

// Configuración del servidor
const PORT = process.env.PORT || 3000;
const app = express();

// Servir archivos estáticos
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

/**
 * Middleware básico
 * Incluye seguridad HTTP, CORS, y manejo de JSON
 */
app.use(helmet()); // Seguridad HTTP
app.use(cors());   // CORS
app.use(express.json()); // Parsear JSON
app.use(express.urlencoded({ extended: true })); // Parsear formularios

/**
 * Rate limiting para prevenir abuso
 * Limita las peticiones a 100 por ventana de 15 segundos
 */
const limiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15000, // 15 segundos
    max: process.env.RATE_LIMIT_MAX_REQUESTS || 100 // 100 peticiones
});
app.use(limiter);

/**
 * Rutas básicas
 */
app.get('/', (req, res) => {
    res.send('Bienvenido a Tidetrack - Sistema de seguimiento financiero');
});

/**
 * Rutas de Categorías
 */
app.get('/api/categorias', async (req, res) => {
    try {
        const categorias = await mockData.getCategorias();
        res.json({ success: true, data: categorias });
    } catch (error) {
        console.error('Error en la ruta /api/categorias:', error);
        res.status(500).json({ success: false, error: 'Error al obtener categorías' });
    }
});

app.post('/api/categorias', async (req, res) => {
    try {
        const nuevaCategoria = await mockData.addCategoria(req.body);
        res.status(201).json({ success: true, data: nuevaCategoria });
    } catch (error) {
        console.error('Error en la ruta /api/categorias:', error);
        res.status(500).json({ success: false, error: 'Error al crear categoría' });
    }
});

/**
 * Rutas de Movimientos
 */
app.get('/api/movimientos', async (req, res) => {
    try {
        const filters = {
            categoria_id: req.query.categoria_id,
            tipo: req.query.tipo,
            fecha_inicio: req.query.fecha_inicio,
            fecha_fin: req.query.fecha_fin
        };
        const movimientos = await mockData.getMovimientos(filters);
        res.json({ success: true, data: movimientos });
    } catch (error) {
        console.error('Error en la ruta /api/movimientos:', error);
        res.status(500).json({ success: false, error: 'Error al obtener movimientos' });
    }
});

app.post('/api/movimientos', async (req, res) => {
    try {
        const nuevoMovimiento = await mockData.addMovimiento(req.body);
        res.status(201).json({ success: true, data: nuevoMovimiento });
    } catch (error) {
        console.error('Error en la ruta /api/movimientos:', error);
        res.status(500).json({ success: false, error: 'Error al crear movimiento' });
    }
});

/**
 * Rutas de Presupuestos
 */
app.get('/api/presupuestos', async (req, res) => {
    try {
        const filters = {
            categoria_id: req.query.categoria_id,
            mes: req.query.mes
        };
        const presupuestos = await mockData.getPresupuestos(filters);
        res.json({ success: true, data: presupuestos });
    } catch (error) {
        console.error('Error en la ruta /api/presupuestos:', error);
        res.status(500).json({ success: false, error: 'Error al obtener presupuestos' });
    }
});

app.post('/api/presupuestos', async (req, res) => {
    try {
        const nuevoPresupuesto = await mockData.addPresupuesto(req.body);
        res.status(201).json({ success: true, data: nuevoPresupuesto });
    } catch (error) {
        console.error('Error en la ruta /api/presupuestos:', error);
        res.status(500).json({ success: false, error: 'Error al crear presupuesto' });
    }
});

/**
 * Middleware de error
 * Maneja errores de manera centralizada
 */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

/**
 * Iniciar el servidor
 */
const startServer = async () => {
    try {
        // Intentar una conexión de prueba
        await googleSheets.readData();
        console.log('✅ Conexión con Google Sheets exitosa');
        
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

// Iniciar el servidor
startServer();
