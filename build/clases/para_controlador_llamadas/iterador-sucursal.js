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
const datebase_1 = __importDefault(require("../../datebase"));
const relaciones_1 = require("../../model/relaciones");
class IteradorDeSucursales {
    //Suma los clientes por cada sucursal y devuelve una promesa con la respuesta.
    static clientesSucursal(sucursal, nombreColumnaRespuesta) {
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
    static saldoTotalSucursal(sucursal, nombreColumnaRespuesta) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield relaciones_1.Cliente.findAll({
                include: [
                    {
                        model: relaciones_1.Cuenta,
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
                group: [datebase_1.default.col('id_sucursal')],
                where: {
                    id_sucursal: sucursal,
                },
            });
            return respuesta;
        });
    }
    //Suma la deuda total de los clientes por cada sucursal y devuelve una promesa con la respuesta.
    static deudaTotalPorSucursal(sucursal, nombreColumnaRespuesta) {
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
}
exports.default = IteradorDeSucursales;
