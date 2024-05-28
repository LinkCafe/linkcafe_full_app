/*
    * Listar Todos Los articulos x
    * Crear Un articulos x
    * Actualizar Un articulos x
    * Mostrar Un articulos x
    * Eliminar Un articulos x
    * Contar comentarios x
*/
import { pool } from '../database/conexion.js'
import { validationResult } from "express-validator";

export const listarComentarios = async (req, res) => {
    try {
        const [resultado] = await pool.query("select * from comentarios")

        if (resultado.length > 0) {
            res.status(200).json(resultado)
        } else {
            res.status(404).json({
                "mensaje": "No hay comentarios"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

export const crearComentario = async (req, res) => {
    try {
        const error = validationResult(req)

        if (!error.isEmpty()) {
            return res.status(404).json({error})
        }

        const { comentario, id_usuario, id_publicacion } = req.body
        const [resultado] = await pool.query("insert into comentarios(comentario, id_usuario, id_publicacion) values (?, ?, ?)", [comentario, id_usuario, id_publicacion])

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Comentario creado con exito"
            })
        } else {
            res.status(404).json({
                "mensaje": "No se pudo crear el Comentario"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

export const actualizarComentario = async (req, res) => {
    try {
        const error = validationResult(req)

        if (!error.isEmpty()) {
            return res.status(404).json({error})
        }

        const { id } = req.params
        const { comentario, id_usuario, id_publicacion } = req.body
        const [oldComment] = await pool.query("select * from comentarios where id=?", [id])
        const [resultado] = await pool.query(`update comentarios set comentario='${comentario ? comentario : oldComment[0].comentario}', 
        id_usuario='${id_usuario ? id_usuario : oldComment[0].id_usuario}', 
        id_publicacion='${id_publicacion ? id_publicacion : oldComment[0].id_publicacion}' where id=${parseInt(id)}`)

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Comentario actualizado"
            })
        } else {
            res.status(404).json({
                "mensaje": "No se pudo actualizar el Comentario"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

export const mostrarUnComentario = async (req, res) => {
    try {
        const { id } = req.params; 
        const [resultado] = await pool.query("select * from comentarios where id=?", [id])

        if (resultado.length > 0) {
            res.status(200).json(resultado)
        } else {
            res.status(404).json({
                "mensaje": "No se encontró el Comentario"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

export const eliminarComentario = async (req, res) => {
    try {
        const { id } = req.params; 
        const [resultado] = await pool.query("delete from comentarios where id=?", [id])

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Haz eliminado con exito el Comentario"
            })
        } else {
            res.status(404).json({
                "mensaje": "No se encontró el Comentario"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

// Contar todos los comentarios
export const contarComentarios = async (req, res) => {
    try {
        const [resultado] = await pool.query("SELECT COUNT(*) as total FROM comentarios");
        res.status(200).json({ total: resultado[0].total });
    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

// Listar comentarios por fecha
export const listarComentariosPorFecha = async (req, res) => {
    try {
        const { fecha } = req.params;
        const [comentarios] = await pool.query("SELECT * FROM comentarios WHERE DATE(fecha) = ?", [fecha]);
        const [count] = await pool.query("SELECT COUNT(*) as total FROM comentarios WHERE DATE(fecha) = ?", [fecha]);

        if (comentarios.length > 0) {
            res.status(200).json({ comentarios, total: count[0].total });
        } else {
            res.status(404).json({
                "mensaje": "No se encontraron comentarios para la fecha proporcionada"
            });
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error.message
        });
    }
}
