import { Router } from "express";
import { actualizarComentario, crearComentario, eliminarComentario, listarComentarios, mostrarUnComentario, contarComentarios, listarComentariosPorFecha } from "../controllers/comentarios.controller.js";
import { middlewaresCreateComentario, middlewaresUpdateComentario } from "../middlewares/comentarios.middleware.js";

const router = Router();

router.get("/comentarios/contar", contarComentarios);
router.get("/comentarios/fecha/:fecha", listarComentariosPorFecha);
router.get('/comentarios/:fechaInicio/:fechaFin?', listarComentariosPorFecha);

router.get("/comentarios", listarComentarios);
router.post("/comentarios", middlewaresCreateComentario, crearComentario);
router.put("/comentarios/:id", middlewaresUpdateComentario, actualizarComentario);
router.get("/comentarios/:id", mostrarUnComentario);
router.delete("/comentarios/:id", eliminarComentario);


export default router;
