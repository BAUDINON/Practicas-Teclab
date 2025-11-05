import {Router} from 'express';
import {postDisponibilidad} from '../controladores/disponibilidad.controladores.js';


const router = Router();

router.post('/disponibilidad', postDisponibilidad);

export default router;