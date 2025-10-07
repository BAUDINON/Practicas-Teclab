import {Router} from 'express';
import {getReservas, getReserva} from '../controladores/reserva.controladores.js';

const router = Router();

router.get('/', getReservas);
router.get('/:id', getReserva);


export default router;