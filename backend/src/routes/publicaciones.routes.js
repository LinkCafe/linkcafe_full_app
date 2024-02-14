import { Router } from 'express'
import { actualizarUnaPublicacion, crearUnaPublicacion, eliminarUnaPublicacion, listarPublicaciones, mostrarSoloUnaPublicacion } from "../controllers/publicaciones.controller.js";

const router = Router();


// http://localhost:3333/publicaciones
router.get("/publicaciones", listarPublicaciones)
router.post("/publicaciones", crearUnaPublicacion)
// http://localhost:3333/publicaciones/3
router.put("/publicaciones/:id", actualizarUnaPublicacion)
router.get("/publicaciones/:id", mostrarSoloUnaPublicacion)
router.delete("/publicaciones/:id", eliminarUnaPublicacion)


export default router