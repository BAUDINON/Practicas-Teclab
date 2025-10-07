import {Router} from 'express';
import {getPrecios, createPrecio, updatePrecio, deletePrecio, getPrecio} from '../controladores/precio.controladores.js';

const router = Router();

router.get('/', getPrecios);
router.post('/', createPrecio);
router.put('/:id', updatePrecio);
router.delete('/:id', deletePrecio);
router.get('/:id', getPrecio);

export default router;