/*
    * Listar Todos Los articulos x
    * Crear Un articulos x
    * Actualizar Un articulos x
    * Mostrar Un articulos x
    * Eliminar Un articulos x
    * Contar articulos x
    * Listar Articulos por fechas x
*/

import { validationResult } from "express-validator";
import { pool } from "../database/conexion.js";

// Listar todos los artículos
export const showArticles = async (req, res) => {
    try {
        const query = `
            SELECT 
                articulos.id,
                articulos.nombre,
                articulos.tipo,
                articulos.enlace,
                articulos.idioma,
                articulos.fecha,
                articulos.autor,
                articulos.descripcion,
                articulos.id_usuario,
                usuarios.nombre_completo AS nombre_usuario
            FROM articulos
            JOIN usuarios ON articulos.id_usuario = usuarios.id
        `;

        const [resultado] = await pool.query(query);

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json({
                "Mensaje": "No Se Encontro Ningun Articulo"
            });
        }
    } catch (error) {
        res.status(500).json({
            "Mensaje": error.message
        });
    }
};


// Crear un artículo
export const createArticles = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const { nombre, enlace, autor, descripcion, idioma, id_usuario } = req.body;

        const [usuario] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id_usuario]);

        if (usuario.length === 0) {
            return res.status(404).json({
                "Mensaje": "No se encontró el ID del usuario"
            });
        }

        const [resultado] = await pool.query("INSERT INTO articulos(nombre, enlace, autor, descripcion, idioma, id_usuario) VALUES(?, ?, ?, ?, ?, ?)", [nombre, enlace, autor, descripcion, idioma, id_usuario]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "Mensaje": "El Articulo Se Creo Con Exito"
            });
        } else {
            res.status(404).json({
                "Mensaje": "No Se Pudo Crear El Articulo"
            });
        }
    } catch (error) {
        res.status(500).json({
            "Mensaje": error.message
        });
    }
};


// Actualizar un artículo
export const updateArticles = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const { id } = req.params;
        const { nombre, enlace, autor, descripcion, idioma, id_usuario } = req.body;

        const [oldUser] = await pool.query("SELECT * FROM articulos WHERE id = ?", [id]);

        if (oldUser.length === 0) {
            return res.status(404).json({
                "mensaje": "No se encontró un artículo con ese ID"
            });
        }

        const [resultado] = await pool.query(`
            UPDATE articulos SET 
            nombre = ?, 
            enlace = ?, 
            autor = ?, 
            descripcion = ?, 
            idioma = ?, 
            id_usuario = ? 
            WHERE id = ?`, [
            nombre || oldUser[0].nombre,
            enlace || oldUser[0].enlace,
            autor || oldUser[0].autor,
            descripcion || oldUser[0].descripcion,
            idioma || oldUser[0].idioma,
            id_usuario || oldUser[0].id_usuario,
            id
        ]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "El artículo ha sido modificado con éxito"
            });
        } else {
            res.status(404).json({
                "mensaje": "No se pudo modificar el artículo"
            });
        }
    } catch (error) {
        res.status (500).json({
            "mensaje": error.message
        });
    }
};


// Mostrar solo un artículo
export const mostrarSoloUnaPublicacion = async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            SELECT 
                articulos.id,
                articulos.nombre,
                articulos.tipo,
                articulos.enlace,
                articulos.idioma,
                articulos.fecha,
                articulos.autor,
                articulos.descripcion,
                articulos.id_usuario,
                usuarios.nombre_completo AS nombre_usuario
            FROM articulos
            JOIN usuarios ON articulos.id_usuario = usuarios.id
            WHERE articulos.id = ?
        `;

        const [resultado] = await pool.query(query, [id]);

        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(404).json({
                "mensaje": "No se encontró Ningun articulo con ese ID"
            });
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error.message
        });
    }
};



// Eliminar un artículo
export const deleteArticles = async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await pool.query("DELETE FROM articulos WHERE id=?", [id]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Se Ha Eliminado Con Exito El Articulo"
            });
        } else {
            res.status(404).json({
                "mensaje": "No se encontró Ningun Articulo con ese ID y no se pudo Efectuar el eliminado"
            });
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error.message
        });
    }
};

// Contar todos los artículos
export const contarArticulos = async (req, res) => {
    try {
        const [resultado] = await pool.query("SELECT COUNT(*) as total FROM articulos");
        if (resultado[0].total === 0) {
            res.status(404).json({ mensaje: "No se encontraron artículos" });
        } else {
            res.status(200).json({ total: resultado[0].total });
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// Listar los artículos por fechas
export const listarArticulosPorFecha = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.params;
        const { idioma } = req.query; // Se obtiene el idioma de los parámetros de consulta

        let query;
        let params;

        if (fechaInicio && fechaFin) {
            // Query para rango de fechas
            query = `
                SELECT 
                    articulos.id,
                    articulos.nombre,
                    articulos.tipo,
                    articulos.enlace,
                    articulos.fecha,
                    articulos.autor,
                    articulos.descripcion,
                    articulos.idioma,
                    articulos.id_usuario,
                    usuarios.nombre_completo AS nombre_usuario
                FROM articulos
                JOIN usuarios ON articulos.id_usuario = usuarios.id
                WHERE DATE(articulos.fecha) BETWEEN ? AND ? AND articulos.idioma = ?
            `;
            params = [fechaInicio, fechaFin, idioma];
        } else if (fechaInicio) {
            // Query para una sola fecha
            query = `
                SELECT 
                    articulos.id,
                    articulos.nombre,
                    articulos.tipo,
                    articulos.enlace,
                    articulos.fecha,
                    articulos.autor,
                    articulos.descripcion,
                    articulos.idioma,
                    articulos.id_usuario,
                    usuarios.nombre_completo AS nombre_usuario
                FROM articulos
                JOIN usuarios ON articulos.id_usuario = usuarios.id
                WHERE DATE(articulos.fecha) = ? AND articulos.idioma = ?
            `;
            params = [fechaInicio, idioma];
        } else {
            return res.status(400).json({
                "mensaje": "Debe proporcionar al menos una fecha"
            });
        }

        const [articulos] = await pool.query(query, params);
        const [count] = await pool.query(`SELECT COUNT(*) as total FROM (${query}) AS subquery`, params);

        if (articulos.length > 0) {
            res.status(200).json({ articulos, total: count[0].total });
        } else {
            res.status(404).json({
                "mensaje": "No se encontraron artículos para las fechas proporcionadas"
            });
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error.message
        });
    }
};

