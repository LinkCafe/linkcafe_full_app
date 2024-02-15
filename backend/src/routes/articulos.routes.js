import { Router } from "express";
import { createArticles, deleteArticles, showAArticles, showArticles, updateArticles } from "../controllers/articulos.controller.js";

const router = Router()

router.get("/articulos", showArticles)
router.post("/articulos", createArticles)
router.put("/articulos/:id", updateArticles)
router.get("/articulos/:id", showAArticles)
router.delete("/articulos/:id", deleteArticles)


export default router
