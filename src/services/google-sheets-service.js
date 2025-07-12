// Servicio para manejar la conexión y operaciones con Google Sheets
const { google } = require('googleapis');
const googleConfig = require('../config/google-sheets-config');

/**
 * Clase que maneja la conexión y operaciones con Google Sheets
 */
class GoogleSheetsService {
    constructor() {
        // Inicializar la conexión con Google Sheets
        this.sheets = google.sheets({
            version: googleConfig.api.version,
            auth: this.getAuthClient()
        });
    }

    /**
     * Obtiene el cliente de autenticación para Google Sheets
     * @returns {Object} Cliente de autenticación configurado
     */
    getAuthClient() {
        return new google.auth.GoogleAuth({
            credentials: {
                type: googleConfig.auth.type,
                project_id: googleConfig.auth.project_id,
                private_key_id: googleConfig.auth.private_key_id,
                private_key: googleConfig.auth.private_key,
                client_email: googleConfig.auth.client_email,
                client_id: googleConfig.auth.client_id,
                auth_uri: googleConfig.auth.auth_uri,
                token_uri: googleConfig.auth.token_uri,
                auth_provider_x509_cert_url: googleConfig.auth.auth_provider_x509_cert_url,
                client_x509_cert_url: googleConfig.auth.client_x509_cert_url
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });
    }

    /**
     * Lee datos de la hoja de cálculo
     * @param {string} range Rango de celdas a leer
     * @returns {Promise<Object>} Datos de la hoja de cálculo
     */
    async readData(range = googleConfig.api.range) {
        try {
            const response = await this.sheets.spreadsheets.values.get({
                spreadsheetId: googleConfig.api.spreadsheetId,
                range: range
            });
            return response.data.values;
        } catch (error) {
            console.error('Error al leer datos de Google Sheets:', error);
            throw error;
        }
    }

    /**
     * Escribe datos en la hoja de cálculo
     * @param {string} range Rango de celdas donde escribir
     * @param {Array<Array>} values Valores a escribir
     * @returns {Promise<Object>} Respuesta de la API
     */
    async writeData(range, values) {
        try {
            const response = await this.sheets.spreadsheets.values.update({
                spreadsheetId: googleConfig.api.spreadsheetId,
                range: range,
                valueInputOption: 'RAW',
                resource: {
                    values: values
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al escribir datos en Google Sheets:', error);
            throw error;
        }
    }
}

module.exports = GoogleSheetsService;
