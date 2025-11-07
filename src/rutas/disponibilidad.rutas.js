import {Router} from 'express';
import {postDisponibilidad} from '../controladores/disponibilidad.controladores.js';


const router = Router();

router.post('/disponibilidad', postDisponibilidad);


router.get('/disponibilidad/hola' , (req, res) => {
    res.send('Hola desde disponibilidad');
});

export default router;