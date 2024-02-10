import { Router } from "express";
import { actualizarUnUsuario,  crearUnUsuario,  eliminarUnUsuario,  listartodo, mostrarunusuario } from "../controllers/usuarios.controller.js";

 const router= Router()

 router.get("/usuarios", listartodo)
 router.post("/usuarios", crearUnUsuario)
 router.put("/usuarios/:id", actualizarUnUsuario)
 router.get("/usuarios/:id",mostrarunusuario)
 router.delete("/usuarios/:id",eliminarUnUsuario)
 

 export default router