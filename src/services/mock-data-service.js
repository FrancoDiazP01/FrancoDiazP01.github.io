// Servicio para manejar datos simulados
const fs = require('fs').promises;
const path = require('path');

/**
 * Clase que maneja la lectura y escritura de datos simulados
 */
class MockDataService {
    constructor() {
        this.dataFilePath = path.join(__dirname, '../../data/movimientos.json');
    }

    /**
     * Lee los datos del archivo JSON
     * @returns {Promise<Object>} Datos simulados
     */
    async readData() {
        try {
            const data = await fs.readFile(this.dataFilePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer datos:', error);
            throw error;
        }
    }

    /**
     * Escribe datos en el archivo JSON
     * @param {Object} data Datos a escribir
     * @returns {Promise<void>}
     */
    async writeData(data) {
        try {
            await fs.writeFile(this.dataFilePath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error al escribir datos:', error);
            throw error;
        }
    }

    /**
     * Obtiene todas las categorías
     * @returns {Promise<Array>} Lista de categorías
     */
    async getCategorias() {
        const data = await this.readData();
        return data.categorias;
    }

    /**
     * Agrega una nueva categoría
     * @param {Object} categoria Datos de la nueva categoría
     * @returns {Promise<Object>} Categoría agregada
     */
    async addCategoria(categoria) {
        const data = await this.readData();
        
        // Generar nuevo ID
        const newId = (parseInt(data.categorias[data.categorias.length - 1].id) + 1).toString();
        const nuevaCategoria = { ...categoria, id: newId, created_at: new Date().toISOString() };
        
        data.categorias.push(nuevaCategoria);
        await this.writeData(data);
        return nuevaCategoria;
    }

    /**
     * Obtiene todos los movimientos
     * @param {Object} filters Filtros para los movimientos
     * @returns {Promise<Array>} Lista de movimientos filtrados
     */
    async getMovimientos(filters = {}) {
        const data = await this.readData();
        let movimientos = [...data.movimientos];

        // Aplicar filtros
        if (filters.categoria_id) {
            movimientos = movimientos.filter(m => m.categoria_id === filters.categoria_id);
        }
        if (filters.tipo) {
            movimientos = movimientos.filter(m => m.tipo === filters.tipo);
        }
        if (filters.fecha_inicio) {
            movimientos = movimientos.filter(m => new Date(m.fecha) >= new Date(filters.fecha_inicio));
        }
        if (filters.fecha_fin) {
            movimientos = movimientos.filter(m => new Date(m.fecha) <= new Date(filters.fecha_fin));
        }

        return movimientos;
    }

    /**
     * Agrega un nuevo movimiento
     * @param {Object} movimiento Datos del nuevo movimiento
     * @returns {Promise<Object>} Movimiento agregado
     */
    async addMovimiento(movimiento) {
        const data = await this.readData();
        
        // Generar nuevo ID
        const newId = (parseInt(data.movimientos[data.movimientos.length - 1].id) + 1).toString();
        const nuevoMovimiento = { ...movimiento, id: newId, created_at: new Date().toISOString() };
        
        data.movimientos.push(nuevoMovimiento);
        await this.writeData(data);
        return nuevoMovimiento;
    }

    /**
     * Obtiene todos los presupuestos
     * @param {Object} filters Filtros para los presupuestos
     * @returns {Promise<Array>} Lista de presupuestos filtrados
     */
    async getPresupuestos(filters = {}) {
        const data = await this.readData();
        let presupuestos = [...data.presupuestos];

        // Aplicar filtros
        if (filters.categoria_id) {
            presupuestos = presupuestos.filter(p => p.categoria_id === filters.categoria_id);
        }
        if (filters.mes) {
            presupuestos = presupuestos.filter(p => p.mes === filters.mes);
        }

        return presupuestos;
    }

    /**
     * Agrega un nuevo presupuesto
     * @param {Object} presupuesto Datos del nuevo presupuesto
     * @returns {Promise<Object>} Presupuesto agregado
     */
    async addPresupuesto(presupuesto) {
        const data = await this.readData();
        
        // Generar nuevo ID
        const newId = (parseInt(data.presupuestos[data.presupuestos.length - 1].id) + 1).toString();
        const nuevoPresupuesto = { ...presupuesto, id: newId, created_at: new Date().toISOString() };
        
        data.presupuestos.push(nuevoPresupuesto);
        await this.writeData(data);
        return nuevoPresupuesto;
    }
}

module.exports = MockDataService;
