import { Router } from "express";
import { createArticles, deleteArticles, showAArticles, showArticles, updateArticles, contarArticulos, listarArticulosPorFecha } from "../controllers/articulos.controller.js";
import { middlewaresShowArticles, middlewaresUpdateArticles } from '../middlewares/articulos.middlewares.js';

const router = Router();

router.get("/articulos/contar", contarArticulos);
router.get("/articulos/fecha/:fecha", listarArticulosPorFecha);
router.get('/articulos/:fechaInicio/:fechaFin?', listarArticulosPorFecha);


router.get("/articulos", showArticles);
router.post("/articulos", middlewaresShowArticles, createArticles);
router.put("/articulos/:id", middlewaresUpdateArticles, updateArticles);
router.get("/articulos/:id", showAArticles);
router.delete("/articulos/:id", deleteArticles);

// Nueva ruta para listar artículos por fecha


export default router;
