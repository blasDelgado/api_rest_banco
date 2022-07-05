import { Router } from 'express';
import ControladorEntradas from '../controller/controlador-entradas';

const router: Router = Router();

router.post('/banco/crear-cliente', ControladorEntradas.nuevoCliente);
router.post('/banco/crear-sucursal', ControladorEntradas.nuevaSucursal);
router.post('/banco/crear-operacion', ControladorEntradas.nuevaOperacion);
router.post('/banco/crear-prestamo', ControladorEntradas.nuevoPrestamo);

export default router;
