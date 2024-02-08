import { Router } from "express";
import { createArticles, deleteArticles, showAArticles, showArticles, updateArticles } from "../controllers/articulos.controller.js";

const router = Router()

router.get("/articulos", showArticles)
router.post("/articulos", createArticles)
router.put("/articulos", updateArticles)
router.get("/articulos", showAArticles)
router.delete("/articulos", deleteArticles)


export default router
