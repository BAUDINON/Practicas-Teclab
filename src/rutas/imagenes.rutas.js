import {Router} from "express";
import {getImagenes, getImagen} from "../controladores/imagenes.controladores.js";

const router = Router();

router.get('/complejo', getImagenes);
router.get('/complejo/:id', getImagen);


export default router;