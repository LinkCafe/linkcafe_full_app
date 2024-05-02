import { Router } from 'express'
import { actualizarUnaPublicacion, crearUnaPublicacion, eliminarUnaPublicacion, listarPublicaciones, mostrarSoloUnaPublicacion} from "../controllers/publicaciones.controller.js";
import  { middlewaresCreatePublics, middlewaresUpdatePublics } from '../middlewares/publicaciones.middlewares.js';
import multer from 'multer';


const router = Router();

// Configuración de multer para manejar la carga de archivos
const upload = multer({ dest: 'uploads/' });

// http://localhost:3333/publicaciones/
router.get("/publicaciones", listarPublicaciones)
router.post("/publicaciones",upload.single('imagen'),middlewaresCreatePublics, crearUnaPublicacion)
// http://localhost:3333/publicaciones/3
router.put("/publicaciones/:id",middlewaresUpdatePublics, actualizarUnaPublicacion)
router.get("/publicaciones/:id", mostrarSoloUnaPublicacion)
router.delete("/publicaciones/:id", eliminarUnaPublicacion)


export default router