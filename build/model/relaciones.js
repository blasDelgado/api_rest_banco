"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sucursal = exports.Prestamo = exports.Extracciones = exports.Depositos = exports.Cuenta = exports.Cliente = void 0;
const cliente_1 = __importDefault(require("../model/cliente"));
exports.Cliente = cliente_1.default;
const cuenta_1 = __importDefault(require("../model/cuenta"));
exports.Cuenta = cuenta_1.default;
const depositos_1 = __importDefault(require("../model/depositos"));
exports.Depositos = depositos_1.default;
const extracciones_1 = __importDefault(require("../model/extracciones"));
exports.Extracciones = extracciones_1.default;
const prestamo_1 = __importDefault(require("../model/prestamo"));
exports.Prestamo = prestamo_1.default;
const sucursal_1 = __importDefault(require("../model/sucursal"));
exports.Sucursal = sucursal_1.default;
agregarRelacion(cliente_1.default, cuenta_1.default, 'numero_de_cuenta');
agregarRelacion(cliente_1.default, sucursal_1.default, 'id_sucursal');
agregarRelacion(cuenta_1.default, prestamo_1.default, 'id_prestamo');
agregarRelacion(cuenta_1.default, depositos_1.default, 'numero_de_cuenta');
agregarRelacion(cuenta_1.default, extracciones_1.default, 'numero_de_cuenta');
agregarRelacion(prestamo_1.default, sucursal_1.default, 'id_sucursal', 'id_sucursal_emisora');
//Funcion que crea una relacion entre dos modelos de 1 a 1.
function agregarRelacion(m1, m2, fk, fk2) {
    if (fk2) {
        m1.hasOne(m2, { foreignKey: fk });
        m2.hasOne(m1, { foreignKey: fk2 });
    }
    else {
        m1.hasOne(m2, { foreignKey: fk });
        m2.hasOne(m1, { foreignKey: fk });
    }
}
