import { Router } from "express";
import { actualizarComentario, crearComentario, eliminarComentario, listarComentarios, mostrarUnComentario } from "../controllers/comentarios.controller.js";

const router = Router()

// http://localhost:3333/comentarios
router.get("/comentarios", listarComentarios)
router.post("/comentarios", crearComentario)
// http://localhost:3333/comentarios/1
router.put("/comentarios/:id", actualizarComentario)
router.get("/comentarios/:id", mostrarUnComentario)
router.delete("/comentarios/:id", eliminarComentario)

export default router