import { Router } from 'express';
import ControladorEntradas from '../controller/controlador-entradas';

const router: Router = Router();

router.post('/banco/crear-cliente', ControladorEntradas.nuevoCliente);

export default router;
