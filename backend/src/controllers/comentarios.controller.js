/*
    * Listar Todos Los articulos x
    * Crear Un articulos x
    * Actualizar Un articulos x
    * Mostrar Un articulos x
    * Eliminar Un articulos x
    * Contar comentarios x
    * Listar comentarios por fechas x
*/
import { pool } from '../database/conexion.js'
import { validationResult } from "express-validator";

//Listar Comentarios
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

//Crear Comentarios
export const crearComentario = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { comentario, id_usuario, id_publicacion } = req.body;

        // Verificar si el usuario existe
        const [usuario] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id_usuario]);
        if (usuario.length === 0) {
            return res.status(404).json({
                "mensaje": "No se encontró el ID del usuario"
            });
        }

        // Verificar si la publicacion existe
        const [publicacion] = await pool.query("SELECT * FROM publicaciones WHERE id = ?", [id_publicacion]);
        if (publicacion.length === 0) {
            return res.status(404).json({
                "mensaje": "No se encontró el ID de la publicacion"
            });
        }

        const [resultado] = await pool.query("INSERT INTO comentarios(comentario, id_usuario, id_publicacion) VALUES (?, ?, ?)", [comentario, id_usuario, id_publicacion]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Comentario creado con exito"
            });
        } else {
            res.status(404).json({
                "mensaje": "No se pudo crear el Comentario"
            });
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error.message
        });
    }
}


//Actualizar Comentarios
// Actualizar Comentarios
export const actualizarComentario = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { comentario, id_usuario, id_publicacion } = req.body;

        // Verificar si el comentario existe
        const [oldComment] = await pool.query("SELECT * FROM comentarios WHERE id = ?", [id]);

        if (oldComment.length === 0) {
            return res.status(404).json({
                "mensaje": "No se encontró un comentario con ese ID"
            });
        }

        // Actualizar el comentario
        const [resultado] = await pool.query(`
            UPDATE comentarios SET 
            comentario = ?, 
            id_usuario = ?, 
            id_publicacion = ? 
            WHERE id = ?`, [
            comentario || oldComment[0].comentario,
            id_usuario || oldComment[0].id_usuario,
            id_publicacion || oldComment[0].id_publicacion,
            id
        ]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Comentario actualizado con éxito"
            });
        } else {
            res.status(404).json({
                "mensaje": "No se pudo actualizar el comentario"
            });
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error.message
        });
    }
};


//Mostrar Comentarios por ID
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

//Eliminar publicaciones
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
        if (resultado[0].total === 0) {
            res.status(404).json({ mensaje: "No se encontraron comentarios" });
        } else {
            res.status(200).json({ total: resultado[0].total });
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}


// Listar comentarios por fecha
export const listarComentariosPorFecha = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.params;

        let query;
        let params;

        if (fechaInicio && fechaFin) {
            // Query para rango de fechas
            query = "SELECT * FROM comentarios WHERE DATE(fecha) BETWEEN ? AND ?";
            params = [fechaInicio, fechaFin];
        } else if (fechaInicio) {
            // Query para una sola fecha
            query = "SELECT * FROM comentarios WHERE DATE(fecha) = ?";
            params = [fechaInicio];
        } else {
            return res.status(400).json({
                "mensaje": "Debe proporcionar al menos una fecha"
            });
        }

        const [comentarios] = await pool.query(query, params);
        const [count] = await pool.query(`SELECT COUNT(*) as total FROM (${query}) AS subquery`, params);

        if (comentarios.length > 0) {
            res.status(200).json({ comentarios, total: count[0].total });
        } else {
            res.status(404).json({
                "mensaje": "No se encontraron comentarios para las fechas proporcionadas"
            });
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error.message
        });
    }
};

// Listar comentarios por ID de publicación
export const listarComentariosPorPublicacion = async (req, res) => {
    try {
        const { idPublicacion } = req.params;

        // Verificar si la publicacion existe
        const [publicacion] = await pool.query("SELECT * FROM publicaciones WHERE id = ?", [idPublicacion]);
        if (publicacion.length === 0) {
            return res.status(400).json({
                "mensaje": "No se encontró una publicación con ese ID"
            });
        }

        // Obtener los comentarios de la publicación
        const [resultado] = await pool.query("SELECT * FROM comentarios WHERE id_publicacion = ?", [idPublicacion]);
        const totalComentarios = resultado.length;

        if (totalComentarios > 0) {
            res.status(200).json({
                total: totalComentarios,
                comentarios: resultado
            });
        } else {
            res.status(404).json({
                "mensaje": "No hay comentarios para esta publicación"
            });
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error.message
        });
    }
};

