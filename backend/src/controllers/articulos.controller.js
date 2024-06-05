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


//Listar Todos los articulos
export const showArticles = async (req, res) => {
    try {
        const [resultado] = await pool.query("SELECT * FROM articulos");

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json({
                "Mensaje": "No Se Encontro Ningun Articulo"
            });
        }
    } catch (error) {
        res.status(500).json({
            "Mensaje": error
        });
    }
};

//Crear articulos
export const createArticles = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }
        const { nombre, enlace, autor, id_usuario } = req.body;
        const [resultado] = await pool.query("INSERT INTO articulos(nombre, enlace, autor, id_usuario) VALUES(?, ?, ?, ?)", [nombre, enlace, autor, id_usuario]);

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
            "Mensaje": error
        });
    }
};

//Actualizar arituclos
export const updateArticles = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json(error.array());
        }
        const { id } = req.params;
        const { nombre, enlace, autor, id_usuario } = req.body;
        const [oldUser] = await pool.query("SELECT * FROM articulos WHERE id=?", [id]);
        const [resultado] = await pool.query(`UPDATE articulos SET 
        nombre='${nombre ? nombre : oldUser[0].nombre}',
        enlace='${enlace ? enlace : oldUser[0].enlace}', 
        autor='${autor ? autor : oldUser[0].autor}',
        id_usuario='${id_usuario ? id_usuario : oldUser[0].id_usuario}'
        WHERE id=${parseInt(id)}`);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "El Articulo A Sido Modificado Con Exito"
            });
        } else {
            res.status(404).json({
                "mensaje": "No Se Pudo Modificar El Articulo"
            });
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error
        });
    }
};


//Listar articulos por id 
export const showAArticles = async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await pool.query("SELECT * FROM articulos WHERE id=?", [id]);

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json({
                "mensaje": "No se encontró Ningun articulo con ese ID"
            });
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error
        });
    }
};

//Eliminar articulos
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
            "mensaje": error
        });
    }
};

// Contar todos los articulos
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

        let query;
        let params;

        if (fechaInicio && fechaFin) {
            // Query para rango de fechas
            query = "SELECT * FROM articulos WHERE DATE(fecha) BETWEEN ? AND ?";
            params = [fechaInicio, fechaFin];
        } else if (fechaInicio) {
            // Query para una sola fecha
            query = "SELECT * FROM articulos WHERE DATE(fecha) = ?";
            params = [fechaInicio];
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

