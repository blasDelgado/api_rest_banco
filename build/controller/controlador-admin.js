"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const relaciones_1 = require("../model/relaciones");
const iterador_sucursal_1 = __importDefault(require("../utils/iterador-sucursal"));
class ControladorAdmin {
    api(req, res) {
        res.json({
            'Todos los Clientes': 'http://localhost:3000/banco/todos-los-clientes',
            'Busca el cliente con el nombre dado': 'http://localhost:3000/banco/cliente-por-nombre',
            'Busca el cliente con el numero de cuenta dado': 'http://localhost:3000/banco/cliente-por-cuenta',
            'Busca el cliente con el saldo mayor que el dado': 'http://localhost:3000/banco/cliente-con-saldo-mayor-que',
            'Busca el cliente con el saldo menor que el dado': 'http://localhost:3000/banco/cliente-con-saldo-menor-que',
            'Busca los clientes que tienen un prestamo': 'http://localhost:3000/banco/cliente-con-prestamo',
            'Todas las extracciones del cliente dado': 'http://localhost:3000/banco/todas-las-extracciones',
            'Todas las extracciones con el monto dado': 'http://localhost:3000/banco/todas-las-extracciones-monto-dado',
            'Todas las extracciones de la fecha dada': 'http://localhost:3000/banco/todas-las-extracciones-fechas-dadas',
            'Todos los dep??sitos del cliente dado': 'http://localhost:3000/banco/todos-los-depositos',
            'Todos los dep??sitos con el monto dado': 'http://localhost:3000/banco/todos-los-depositos-monto-dado',
            'Todos los dep??sitos de la fecha dada': 'http://localhost:3000/banco/todos-los-depositos-fechas-dadas',
            'Monto total ,que actualmente ,le deben al banco': 'http://localhost:3000/banco/monto-total-de-deuda-emitida',
            'Cantidad de clientes por cada sucursal': 'http://localhost:3000/banco/total-de-clientes-por-sucursal',
            'Cantidad de plata depositada por cada sucursal': 'http://localhost:3000/banco/total-de-depositos-por-sucursal',
            'Cantidad de deuda ,de los clientes, por cada sucursal': 'http://localhost:3000/banco/total-de-deuda-por-sucursal',
        });
    }
    todosLosClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield relaciones_1.Cliente.findAll();
                res.status(200).json(respuesta);
            }
            catch (e) {
                res.status(500).json({ Mensaje: 'ocurri?? un error' });
                console.error(e);
            }
        });
    }
    clientePorNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = req.body.nombre;
            try {
                const respuesta = yield relaciones_1.Cliente.findAll({
                    where: { nombre_cliente: nombre },
                });
                if (!respuesta[0]) {
                    res
                        .status(200)
                        .json({ mensaje: 'No existe el cliente con el nombre dado' });
                }
                else {
                    res.status(200).json(respuesta);
                }
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurri?? un error' });
            }
        });
    }
    clientePorCuenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cuenta = req.body.cuenta;
            try {
                const respuesta = yield relaciones_1.Cliente.findAll({
                    where: { numero_de_cuenta: cuenta },
                });
                if (!respuesta[0]) {
                    res.status(200).json({
                        mensaje: 'No existe el cliente con el numero de cuenta dada',
                    });
                }
                else {
                    res.status(200).json(respuesta);
                }
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurri?? un error' });
            }
        });
    }
    clienteConMasSaldoQueElDado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const saldo = req.body.saldo;
            try {
                const respuesta = yield relaciones_1.Cuenta.findAll({
                    include: {
                        model: relaciones_1.Cliente,
                        attributes: ['nombre_cliente'],
                    },
                    attributes: ['saldo', 'numero_de_cuenta'],
                    where: {
                        saldo: {
                            [sequelize_1.Op.gt]: saldo,
                        },
                    },
                });
                if (!respuesta[0]) {
                    res.status(200).json({
                        mensaje: 'No existen clientes con saldo mayor que ese',
                    });
                }
                else {
                    res.status(200).json(respuesta);
                }
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurri?? un error' });
            }
        });
    }
    clienteConMenosSaldoQueElDado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const saldo = req.body.saldo;
            try {
                const respuesta = yield relaciones_1.Cuenta.findAll({
                    include: {
                        model: relaciones_1.Cliente,
                        attributes: ['nombre_cliente'],
                    },
                    attributes: ['saldo', 'numero_de_cuenta'],
                    where: {
                        saldo: {
                            [sequelize_1.Op.lt]: saldo,
                        },
                    },
                });
                if (!respuesta[0]) {
                    res.status(200).json({
                        mensaje: 'No existen clientes con menos de ese saldo',
                    });
                }
                else {
                    res.status(200).json(respuesta);
                }
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurri?? un error' });
            }
        });
    }
    clienteConPrestamo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield relaciones_1.Cuenta.findAll({
                    include: [
                        {
                            model: relaciones_1.Prestamo,
                            attributes: [
                                'cantidad_adeudada',
                                'fecha_de_vencimiento',
                                'id_sucursal_emisora',
                            ],
                        },
                        {
                            model: relaciones_1.Cliente,
                            attributes: ['nombre_cliente'],
                        },
                    ],
                    attributes: ['numero_de_cuenta', 'saldo'],
                    where: {
                        prestamos_pendientes: ['1'],
                    },
                });
                res.status(200).json(respuesta);
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurri?? un error' });
            }
        });
    }
    todasLasExtracciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cuenta = req.body.cuenta;
            try {
                const respuesta = yield relaciones_1.Extracciones.findAll({
                    where: {
                        numero_de_cuenta: [cuenta],
                    },
                });
                if (!respuesta[0]) {
                    res.status(200).json({
                        mensaje: 'El cliente no existe , o no realiz?? ninguna extraccion',
                    });
                }
                else {
                    res.status(200).json(respuesta);
                }
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurri?? un error' });
            }
        });
    }
    extraccionesPorMonto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const monto = req.body.monto;
            try {
                const respuesta = yield relaciones_1.Extracciones.findAll({
                    where: {
                        monto_extraido: [monto],
                    },
                });
                if (!respuesta[0]) {
                    res.status(200).json({
                        mensaje: 'No existen extracciones con ese monto',
                    });
                }
                else {
                    res.status(200).json(respuesta);
                }
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurri?? un error' });
            }
        });
    }
    extraccionesPorFecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fecha = req.body.fecha;
            const fechaForm = new Date(fecha);
            try {
                const respuesta = yield relaciones_1.Extracciones.findAll({
                    where: {
                        fecha_de_extraccion: [fechaForm],
                    },
                });
                if (!respuesta[0]) {
                    res.status(200).json({
                        mensaje: 'No existen extracciones en esa fecha',
                    });
                }
                else {
                    res.status(200).json(respuesta);
                }
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurri?? un error' });
            }
        });
    }
    todosLosDepositos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cuenta = req.body.cuenta;
            try {
                const respuesta = yield relaciones_1.Depositos.findAll({
                    where: {
                        numero_de_cuenta: [cuenta],
                    },
                });
                if (!respuesta[0]) {
                    res.status(200).json({
                        mensaje: 'El cliente no existe , o no realiz?? dep??sitos',
                    });
                }
                else {
                    res.status(200).json(respuesta);
                }
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurri?? un error' });
            }
        });
    }
    depositosPorMonto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const monto = req.body.monto;
            try {
                const respuesta = yield relaciones_1.Depositos.findAll({
                    where: {
                        monto_depositado: [monto],
                    },
                });
                if (!respuesta[0]) {
                    res.status(200).json({
                        mensaje: 'No existen dep??sitos con ese monto',
                    });
                }
                else {
                    res.status(200).json(respuesta);
                }
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurri?? un error' });
            }
        });
    }
    depositosPorFecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fecha = req.body.fecha;
            const fechaForm = new Date(fecha);
            try {
                const respuesta = yield relaciones_1.Depositos.findAll({
                    where: {
                        fecha_de_deposito: [fechaForm],
                    },
                });
                if (!respuesta[0]) {
                    res.status(200).json({
                        mensaje: 'No existen dep??sitos en esa fecha',
                    });
                }
                else {
                    res.status(200).json(respuesta);
                }
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurri?? un error' });
            }
        });
    }
    totalDePlataPrestada(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield relaciones_1.Prestamo.sum('cantidad_adeudada');
                res.status(200).json({ Monto_total: respuesta });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurri?? un error' });
            }
        });
    }
    totalDePlataEnElBanco(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield relaciones_1.Cuenta.sum('saldo');
                res.status(200).json({ Monto_total: respuesta });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurri?? un error' });
            }
        });
    }
    totalDeClientesPorSucursal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta1 = yield iterador_sucursal_1.default.clientesSucursal('1', 'total_clientes_sucursal_1');
                const respuesta2 = yield iterador_sucursal_1.default.clientesSucursal('2', 'total_clientes_sucursal_2');
                const respuesta3 = yield iterador_sucursal_1.default.clientesSucursal('3', 'total_clientes_sucursal_3');
                res.status(200).json([respuesta1, respuesta2, respuesta3]);
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurri?? un error' });
            }
        });
    }
    saldoTotalPorSucursal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta1 = yield iterador_sucursal_1.default.saldoTotalSucursal('1', 'saldo_total_sucursal_1');
                const respuesta2 = yield iterador_sucursal_1.default.saldoTotalSucursal('2', 'saldo_total_sucursal_2');
                const respuesta3 = yield iterador_sucursal_1.default.saldoTotalSucursal('3', 'saldo_total_sucursal_3');
                res.status(200).json({ respuesta1, respuesta2, respuesta3 });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurri?? un error' });
            }
        });
    }
    deudaTotalPorSucursal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta1 = yield iterador_sucursal_1.default.deudaTotalPorSucursal('1', 'deuda_total_sucursal_1');
                const respuesta2 = yield iterador_sucursal_1.default.deudaTotalPorSucursal('2', 'deuda_total_sucursal_2');
                const respuesta3 = yield iterador_sucursal_1.default.deudaTotalPorSucursal('3', 'deuda_total_sucursal_3');
                res.status(200).json({ respuesta1, respuesta2, respuesta3 });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurri?? un error' });
            }
        });
    }
}
exports.default = new ControladorAdmin();
