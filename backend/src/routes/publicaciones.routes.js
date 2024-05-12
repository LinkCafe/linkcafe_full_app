import { Router } from 'express';
import { cargarImagen, crearUnaPublicacion, eliminarUnaPublicacion, listarPublicaciones, mostrarSoloUnaPublicacion, actualizarUnaPublicacion } from "../controllers/publicaciones.controller.js";
import { middlewaresCreatePublics, middlewaresUpdatePublics } from '../middlewares/publicaciones.middlewares.js';

const router = Router();

// http://localhost:3333/publicaciones/
router.get("/publicaciones", listarPublicaciones);
router.post("/publicaciones", cargarImagen, middlewaresCreatePublics, crearUnaPublicacion);

// http://localhost:3333/publicaciones/3
router.put("/publicaciones/:id", cargarImagen, middlewaresUpdatePublics, actualizarUnaPublicacion);
router.get("/publicaciones/:id", mostrarSoloUnaPublicacion);
router.delete("/publicaciones/:id", eliminarUnaPublicacion);

export default router;