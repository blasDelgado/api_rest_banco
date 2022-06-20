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
// Relacion Cliente con Cuenta
cliente_1.default.hasOne(cuenta_1.default, { foreignKey: 'numero_de_cuenta' });
cuenta_1.default.hasOne(cliente_1.default, { foreignKey: 'numero_de_cuenta' });
// Relacion Cliente con Sucursal
cliente_1.default.hasOne(sucursal_1.default, { foreignKey: 'id_sucursal' });
sucursal_1.default.hasOne(cliente_1.default, { foreignKey: 'id_sucursal' });
//Relacion Cuenta con Prestamo
cuenta_1.default.hasOne(prestamo_1.default, { foreignKey: 'id_prestamo' });
prestamo_1.default.hasOne(cuenta_1.default, { foreignKey: 'id_prestamo' });
//Relacion Deposito con Cuenta
cuenta_1.default.hasOne(depositos_1.default, { foreignKey: 'numero_de_cuenta' });
depositos_1.default.hasOne(cuenta_1.default, { foreignKey: 'numero_de_cuenta' });
//Relacion Extracciones con Cuenta
cuenta_1.default.hasOne(extracciones_1.default, { foreignKey: 'numero_de_cuenta' });
extracciones_1.default.hasOne(cuenta_1.default, { foreignKey: 'numero_de_cuenta' });
//Relacion Prestamo con Sucursal
prestamo_1.default.hasOne(sucursal_1.default, { foreignKey: 'id_sucursal' });
sucursal_1.default.hasOne(prestamo_1.default, { foreignKey: 'id_sucursal_emisora' });
