import { Routes } from "express";
import { createArticles, deleteArticles, showAArticles, showArticles, updateArticles } from "../controllers/articulos.controllers";

const router = Routes()

router.get("/articulos", showArticles)
router.post("/articulos", createArticles)
router.put("/articulos", updateArticles)
router.get("/articulos", showAArticles)
router.delete("/articulos", deleteArticles)


export default router()
