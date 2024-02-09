/* 
listar todo
crear todo
actualiizar }
mostrar
*/

import { pool } from "../database/conexion.js";

// funcion asincrona  funciona recibiendo un request por part del usuario y un response por parte del desarrolador
export const listartodo = async(req, res)=>{
    try {
        // el await va de la mano con async
        const [resultado]= await pool.query("select*from usuarios")

        if (resultado.length >0) {
            res.status(200).json(resultado)
        }else{
            res.status(404).json({
                "mensaje":"no hay usuarios registrados"
            })

        }
    } catch (error) {
            res.status(500).json({
            "mensaje" : error
            })
    }
}

export const crearUnUsuario = async (req, res) => {
    try {
        // se crea un  
        const { nombre_completo, correo, clave } = req.body
        const [ resultado ] = await pool.query("insert into usuarios(nombre_completo, correo, clave) values (?, ?, ?)", [nombre_completo, correo, clave])

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "El usuario ha sido creado con exito!!!!!"
            })
        } else {
            res.status(404).json({
                "mensaje": "No se pudo crear el usuario el usuario"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

export const actualizarUnUsuario = async (req, res) => {
    try {
        //se crea el id como parametro
        const { id } = req.params
        const { nombre_completo, correo, clave } = req.body
        const [ oldUser ] = await pool.query("select * from usuarios where id=?", [id])
        const [ resultado ] = await pool.query(`update usuarios set nombre_completo='${nombre_completo?nombre_completo:oldUser[0].nombre_completo}', correo='${correo?correo:oldUser[0].correo}', clave='${clave?clave:oldUser[0].clave}' where id=${parseInt(id)}`)

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "El usuario ha sido actualizado"
            })
        } else {
            res.status(404).json({
                "mensaje": "No se pudo actualizar el usuario"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

    
    export const mostrarunusuario = async(req, res)=>{
        try {
            const {id}=req.params
            // el await va de la mano con async
            const [resultado] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
            if (resultado.length >0) {
                res.status(200).json(resultado)
            }else{
                res.status(404).json({
                    "mensaje":"no se encontro este usuario"
                })

            }
        } catch (error) {
                res.status(500).json({
                "mensaje" : error
                })
        }
    }
    
export const eliminarUnUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Eliminar registros relacionados en otras tablas
        await pool.query("DELETE FROM comentarios WHERE id_usuario = ?", [id]);
        // Agrega aquí más consultas DELETE según sea necesario para las tablas relacionadas
        await pool.query("DELETE FROM articulos where id_usuario=?", [id])

        await pool.query("DELETE FROM publicaciones where id_usuario=?", [id])
        
        // Eliminar el usuario de la tabla "usuarios"
        const [resultado] = await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "Se eliminó exitosamente el usuario y los registros relacionados"
            });
        } else {
            res.status(404).json({
                "mensaje": "No se encontró ningún usuario con ese ID y no se pudo eliminar"
            });
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error.message
        });
    }
};