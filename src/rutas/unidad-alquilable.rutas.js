import {Router} from 'express';
import {getUnidadesAlquilables, createUnidadAlquilable, updateUnidadAlquilable, getUnidadAlquilable, deleteUnidadAlquilable} from '../controladores/unidad-alquilable.controladores.js';

const router = Router();

router.get('/', getUnidadesAlquilables);
router.post('/', createUnidadAlquilable);
router.put('/:id', updateUnidadAlquilable);
router.delete('/:id', deleteUnidadAlquilable);
router.get('/:id', getUnidadAlquilable);



export default router;