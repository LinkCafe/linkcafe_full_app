import { Router } from 'express';
import { 
    cargarImagen, 
    crearUnaPublicacion, 
    eliminarUnaPublicacion, 
    listarPublicaciones, 
    mostrarSoloUnaPublicacion, 
    actualizarUnaPublicacion, 
    contarPublicaciones, 
    listarPublicacionesPorFecha,
    cambiarEstadoPublicacion 
} from "../controllers/publicaciones.controller.js";
import { middlewaresCreatePublics, middlewaresUpdatePublics } from '../middlewares/publicaciones.middlewares.js';

const router = Router();

router.get("/publicaciones/contar", contarPublicaciones);
router.get("/publicaciones/fecha/:fecha", listarPublicacionesPorFecha);
router.get('/publicaciones/:fechaInicio/:fechaFin?', listarPublicacionesPorFecha);

router.get("/publicaciones", listarPublicaciones);
router.post("/publicaciones", cargarImagen, middlewaresCreatePublics, crearUnaPublicacion);

router.put("/publicaciones/:id", cargarImagen, middlewaresUpdatePublics, actualizarUnaPublicacion);
router.put("/publicaciones/estado/:id", cambiarEstadoPublicacion); // Nueva ruta para cambiar el estado
router.get("/publicaciones/:id", mostrarSoloUnaPublicacion);
router.delete("/publicaciones/:id", eliminarUnaPublicacion);

export default router;
