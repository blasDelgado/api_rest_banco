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
const datebase_1 = __importDefault(require("../datebase"));
const relaciones_1 = require("../model/relaciones");
const relaciones_2 = require("../model/relaciones");
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
            'Todos los depósitos del cliente dado': 'http://localhost:3000/banco/todos-los-depositos',
            'Todos los depósitos con el monto dado': 'http://localhost:3000/banco/todos-los-depositos-monto-dado',
            'Todos los depósitos de la fecha dada': 'http://localhost:3000/banco/todos-los-depositos-fechas-dadas',
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
                res.status(500).json({ Mensaje: 'ocurrió un error' });
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
                res.status(500).json({ Mensaje: 'ocurrió un error' });
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
                res.status(500).json({ Mensaje: 'ocurrió un error' });
            }
        });
    }
    clienteConMasSaldoQueElDado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const saldo = req.body.saldo;
            try {
                const respuesta = yield relaciones_2.Cuenta.findAll({
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
                res.status(500).json({ Mensaje: 'ocurrió un error' });
            }
        });
    }
    clienteConMenosSaldoQueElDado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const saldo = req.body.saldo;
            try {
                const respuesta = yield relaciones_2.Cuenta.findAll({
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
                res.status(500).json({ Mensaje: 'ocurrió un error' });
            }
        });
    }
    clienteConPrestamo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield relaciones_2.Cuenta.findAll({
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
                res.status(500).json({ Mensaje: 'ocurrió un error' });
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
                        mensaje: 'El cliente no existe , o no realizó ninguna extraccion',
                    });
                }
                else {
                    res.status(200).json(respuesta);
                }
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurrió un error' });
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
                res.status(500).json({ Mensaje: 'ocurrió un error' });
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
                res.status(500).json({ Mensaje: 'ocurrió un error' });
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
                        mensaje: 'El cliente no existe , o no realizó depósitos',
                    });
                }
                else {
                    res.status(200).json(respuesta);
                }
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurrió un error' });
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
                        mensaje: 'No existen depósitos con ese monto',
                    });
                }
                else {
                    res.status(200).json(respuesta);
                }
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurrió un error' });
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
                        mensaje: 'No existen depósitos en esa fecha',
                    });
                }
                else {
                    res.status(200).json(respuesta);
                }
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurrió un error' });
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
                res.status(500).json({ Mensaje: 'ocurrió un error' });
            }
        });
    }
    totalDePlataEnElBanco(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield relaciones_2.Cuenta.sum('saldo');
                res.status(200).json({ Monto_total: respuesta });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurrió un error' });
            }
        });
    }
    totalDeClientesPorSucursal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta1 = yield clientesSucursal('1', 'total_clientes_sucursal_1');
                const respuesta2 = yield clientesSucursal('2', 'total_clientes_sucursal_2');
                const respuesta3 = yield clientesSucursal('3', 'total_clientes_sucursal_3');
                res.status(200).json([respuesta1, respuesta2, respuesta3]);
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurrió un error' });
            }
        });
    }
    saldoTotalPorSucursal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta1 = yield saldoTotalSucursal('1', 'saldo_total_sucursal_1');
                const respuesta2 = yield saldoTotalSucursal('2', 'saldo_total_sucursal_2');
                const respuesta3 = yield saldoTotalSucursal('3', 'saldo_total_sucursal_3');
                res.status(200).json({ respuesta1, respuesta2, respuesta3 });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurrió un error' });
            }
        });
    }
    deudaTotalPorSucursal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta1 = yield deudaTotalPorSucursal('1', 'deuda_total_sucursal_1');
                const respuesta2 = yield deudaTotalPorSucursal('2', 'deuda_total_sucursal_2');
                const respuesta3 = yield deudaTotalPorSucursal('3', 'deuda_total_sucursal_3');
                res.status(200).json({ respuesta1, respuesta2, respuesta3 });
            }
            catch (e) {
                console.error(e);
                res.status(500).json({ Mensaje: 'ocurrió un error' });
            }
        });
    }
}
exports.default = new ControladorAdmin();
//Funciones útiles
//Suma los clientes por cada sucursal y devuelve una promesa con la respuesta.
function clientesSucursal(sucursal, nombreColumnaRespuesta) {
    return __awaiter(this, void 0, void 0, function* () {
        const respuesta = yield relaciones_1.Cliente.findAll({
            attributes: [
                [
                    datebase_1.default.fn('Count', datebase_1.default.col('id_sucursal')),
                    nombreColumnaRespuesta,
                ],
            ],
            where: {
                id_sucursal: sucursal,
            },
        });
        return respuesta;
    });
}
//Suma todos los saldos de cada cliente por cada sucursal y devuelve una promesa con la respuesta.
function saldoTotalSucursal(sucursal, nombreColumnaRespuesta) {
    return __awaiter(this, void 0, void 0, function* () {
        const respuesta = yield relaciones_1.Cliente.findAll({
            include: [
                {
                    model: relaciones_2.Cuenta,
                    attributes: {
                        exclude: [
                            'numero_de_cuenta',
                            'saldo',
                            'id_prestamo',
                            'prestamos_pendientes',
                        ],
                    },
                },
            ],
            attributes: [
                [datebase_1.default.fn('SUM', datebase_1.default.col('saldo')), nombreColumnaRespuesta],
            ],
            where: {
                id_sucursal: sucursal,
            },
        });
        return respuesta;
    });
}
//Suma la deuda total de los clientes por cada sucursal y devuelve una promesa con la respuesta.
function deudaTotalPorSucursal(sucursal, nombreColumnaRespuesta) {
    return __awaiter(this, void 0, void 0, function* () {
        const respuesta = yield relaciones_1.Prestamo.findAll({
            attributes: [
                [
                    datebase_1.default.fn('SUM', datebase_1.default.col('cantidad_adeudada')),
                    nombreColumnaRespuesta,
                ],
            ],
            where: {
                id_sucursal_emisora: sucursal,
            },
        });
        return respuesta;
    });
}
