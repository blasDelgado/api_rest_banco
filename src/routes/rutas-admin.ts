import { Router } from 'express';
import ControladorAdmin from '../controller/controlador-admin';

const router = Router();

router.get('/api', ControladorAdmin.api);
router.get('/banco/todos-los-clientes', ControladorAdmin.todosLosClientes);
router.get('/banco/cliente-por-nombre', ControladorAdmin.clientePorNombre);
router.get('/banco/cliente-por-cuenta', ControladorAdmin.clientePorCuenta);
router.get(
  '/banco/cliente-con-saldo-mayor-que',
  ControladorAdmin.clienteConMasSaldoQueElDado
);
router.get(
  '/banco/cliente-con-saldo-menor-que',
  ControladorAdmin.clienteConMenosSaldoQueElDado
);
router.get('/banco/cliente-con-prestamo', ControladorAdmin.clienteConPrestamo);
router.get(
  '/banco/todas-las-extracciones',
  ControladorAdmin.todasLasExtracciones
);
router.get(
  '/banco/todas-las-extracciones-monto-dado',
  ControladorAdmin.extraccionesPorMonto
);
router.get(
  '/banco/todas-las-extracciones-fechas-dadas',
  ControladorAdmin.extraccionesPorFecha
);
router.get('/banco/todos-los-depositos', ControladorAdmin.todosLosDepositos);
router.get(
  '/banco/todos-los-depositos-monto-dado',
  ControladorAdmin.depositosPorMonto
);
router.get(
  '/banco/todos-los-depositos-fechas-dadas',
  ControladorAdmin.depositosPorFecha
);
router.get(
  '/banco/monto-total-de-deuda-emitida',
  ControladorAdmin.totalDePlataPrestada
);
router.get(
  '/banco/total-de-clientes-por-sucursal',
  ControladorAdmin.totalDeClientesPorSucursal
);
router.get(
  '/banco/total-de-depositos-por-sucursal',
  ControladorAdmin.saldoTotalPorSucursal
);
router.get(
  '/banco/total-de-deuda-por-sucursal',
  ControladorAdmin.deudaTotalPorSucursal
);

export default router;
