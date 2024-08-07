/*
    * Listar Todos Los articulos x
    * Crear Un articulos x
    * Actualizar Un articulos x
    * Mostrar Un articulos x
    * Eliminar Un articulos x
    * Contar publicaciones x
    * Listar publicaciones por fechas x
*/
import multer from 'multer';
import { pool } from '../database/conexion.js';
import { validationResult } from "express-validator";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

export const cargarImagen = upload.single('imagen');

// Listar todas las publicaciones
export const listarPublicaciones = async (req, res) => {
    try {
        const query = `
            SELECT 
                publicaciones.id,
                publicaciones.nombre,
                publicaciones.descripcion,
                publicaciones.imagen,
                publicaciones.fuentes,
                publicaciones.tipo,
                publicaciones.fecha,
                publicaciones.estado,
                publicaciones.id_usuario,
                publicaciones.idioma,
                usuarios.nombre_completo AS nombre_usuario
            FROM publicaciones
            JOIN usuarios ON publicaciones.id_usuario = usuarios.id
        `;

        const [resultado] = await pool.query(query);

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json({
                "mensaje": "No encontramos publicaciones"
            });
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error.message
        });
    }
};


// Crear una nueva publicación
export const crearUnaPublicacion = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const { nombre, descripcion, fuentes, tipo, id_usuario, idioma } = req.body;

        const imagen = req.file.originalname;

        // Asegurarse de que id_usuario sea un número
        if (isNaN(id_usuario)) {
            return res.status(400).json({ mensaje: "El ID de usuario debe ser un número válido." });
        }

        // Verificar si el usuario existe
        const [usuarioExistente] = await pool.query("SELECT * FROM usuarios WHERE id=?", [id_usuario]);

        if (usuarioExistente.length === 0) {
            return res.status(404).json({ mensaje: "No se encontró el usuario con el ID proporcionado." });
        }


        // Insertar la nueva publicación en la base de datos
        await pool.query("INSERT INTO publicaciones (nombre, descripcion, imagen, fuentes, tipo, id_usuario, idioma) VALUES (?, ?, ?, ?, ?, ?, ?)", [nombre, descripcion, imagen, fuentes, tipo, id_usuario, idioma]);

        return res.status(200).json({ mensaje: "Publicación creada y procesada con éxito" });

    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
}


// Actualizar una publicación
export const actualizarUnaPublicacion = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { nombre, descripcion, fuentes, tipo, estado, idioma } = req.body; 

        let imagen = req.file ? req.file.originalname : null;

        const [oldPost] = await pool.query("SELECT * FROM publicaciones WHERE id=?", [id]);
        if (!oldPost || oldPost.length === 0) {
            return res.status(401).json({
                "mensaje": "No se encontró la publicación"
            });
        }

        if (!imagen) {
            imagen = oldPost[0].imagen;
        }

        const updateFields = {
            nombre: nombre || oldPost[0].nombre,
            descripcion: descripcion || oldPost[0].descripcion,
            imagen: imagen,
            fuentes: fuentes || oldPost[0].fuentes,
            tipo: tipo || oldPost[0].tipo,
            estado: estado || oldPost[0].estado,
            idioma: idioma || oldPost[0].idioma
        };

        const [resultado] = await pool.query(`
            UPDATE publicaciones 
            SET ? 
            WHERE id=?
        `, [updateFields, id]);

        if (resultado.affectedRows > 0) {
            return res.status(200).json({
                "mensaje": "La publicación ha sido actualizada"
            });
        } else {
            return res.status(404).json({
                "mensaje": "No se pudo actualizar la publicación, ¡intente de nuevo!"
            });
        }

    } catch (error) {
        return res.status(500).json({
            "mensaje": error.message
        });
    }
};


// Mostrar solo una publicación
export const mostrarSoloUnaPublicacion = async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            SELECT 
                publicaciones.id,
                publicaciones.nombre,
                publicaciones.descripcion,
                publicaciones.imagen,
                publicaciones.fuentes,
                publicaciones.tipo,
                publicaciones.idioma,
                publicaciones.fecha,
                publicaciones.estado,
                publicaciones.id_usuario,
                usuarios.nombre_completo AS nombre_usuario
            FROM publicaciones
            JOIN usuarios ON publicaciones.id_usuario = usuarios.id
            WHERE publicaciones.id = ?
        `;

        const [resultado] = await pool.query(query, [id]);

        if (resultado.length > 0) {
            return res.status(200).json(resultado[0]);
        } else {
            return res.status(404).json({
                "mensaje": "No se encontró esa publicación con ese ID"
            });
        }

    } catch (error) {
        return res.status(500).json({
            "mensaje": error.message
        });
    }
};



// Eliminar una publicación
export const eliminarUnaPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await pool.query("DELETE FROM publicaciones WHERE id=?", [id]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Has eliminado con éxito la publicación"
            });
        } else {
            res.status(404).json({
                "mensaje": "No se encontró esa publicación con ese ID y no se pudo eliminar"
            });
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error.message
        });
    }
}

// Contar todas las publicaciones
export const contarPublicaciones = async (req, res) => {
    try {
        const [resultado] = await pool.query("SELECT COUNT(*) as total FROM publicaciones");
        if (resultado[0].total === 0) {
            res.status(404).json({ mensaje: "No se encontraron publicaciones" });
        } else {
            res.status(200).json({ total: resultado[0].total });
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}


// Listar publicaciones por fecha
export const listarPublicacionesPorFecha = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.params;
        const { idioma } = req.query; // Se obtiene el idioma de los parámetros de consulta

        let query;
        let params;

        if (fechaInicio && fechaFin) {
            // Query para rango de fechas
            query = `
                SELECT 
                    publicaciones.id,
                    publicaciones.nombre,
                    publicaciones.descripcion,
                    publicaciones.imagen,
                    publicaciones.fuentes,
                    publicaciones.tipo,
                    publicaciones.fecha,
                    publicaciones.estado,
                    publicaciones.idioma,
                    publicaciones.id_usuario,
                    usuarios.nombre_completo AS nombre_usuario
                FROM publicaciones
                JOIN usuarios ON publicaciones.id_usuario = usuarios.id
                WHERE DATE(publicaciones.fecha) BETWEEN ? AND ? AND publicaciones.idioma = ?
            `;
            params = [fechaInicio, fechaFin, idioma];
        } else if (fechaInicio) {
            // Query para una sola fecha
            query = `
                SELECT 
                    publicaciones.id,
                    publicaciones.nombre,
                    publicaciones.descripcion,
                    publicaciones.imagen,
                    publicaciones.fuentes,
                    publicaciones.tipo,
                    publicaciones.fecha,
                    publicaciones.estado,
                    publicaciones.idioma,
                    publicaciones.id_usuario,
                    usuarios.nombre_completo AS nombre_usuario
                FROM publicaciones
                JOIN usuarios ON publicaciones.id_usuario = usuarios.id
                WHERE DATE(publicaciones.fecha) = ? AND publicaciones.idioma = ?
            `;
            params = [fechaInicio, idioma];
        } else {
            return res.status(400).json({
                "mensaje": "Debe proporcionar al menos una fecha"
            });
        }

        const [publicaciones] = await pool.query(query, params);
        const [count] = await pool.query(`SELECT COUNT(*) as total FROM (${query}) AS subquery`, params);

        if (publicaciones.length > 0) {
            res.status(200).json({ publicaciones, total: count[0].total });
        } else {
            res.status(404).json({
                "mensaje": "No se encontraron publicaciones para las fechas proporcionadas"
            });
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error.message
        });
    }
};



// Cambiar el estado de una publicación
export const cambiarEstadoPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        // Verificar que el estado sea un número válido
        const estadosValidos = [1, 2, 3];
        if (!estadosValidos.includes(Number(estado))) {
            return res.status(400).json({ mensaje: "Estado no válido" });
        }

        // Actualizar el estado en la base de datos
        const [resultado] = await pool.query(`
            UPDATE publicaciones 
            SET estado = ?
            WHERE id = ?
        `, [estado, id]);

        if (resultado.affectedRows > 0) {
            return res.status(200).json({ mensaje: "Estado de la publicación actualizado con éxito" });
        } else {
            return res.status(404).json({ mensaje: "No se encontró la publicación" });
        }
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
}


 