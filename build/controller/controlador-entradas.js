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
const agregar_cliente_1 = __importDefault(require("../service/entradas/agregar-cliente"));
const agregar_operacion_1 = __importDefault(require("../service/entradas/agregar-operacion"));
const agregar_prestamo_1 = __importDefault(require("../service/entradas/agregar-prestamo"));
const agregar_sucursal_1 = __importDefault(require("../service/entradas/agregar-sucursal"));
class ControladorEntradas {
    nuevoCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = req.body.cliente;
            const cuenta = req.body.cuenta;
            try {
                let mensaje = yield agregar_cliente_1.default.crearCliente(cuenta, cliente);
                res.status(200).json({ mensaje: mensaje });
            }
            catch (e) {
                res.status(500).json({ mensaje: "ocurrió un error en el servidor" });
                console.error(e);
            }
        });
    }
    nuevaSucursal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sucursal = req.body.sucursal;
            try {
                let mensaje = yield agregar_sucursal_1.default.crearSucursal(sucursal);
                res.status(200).json({ mensaje: mensaje });
            }
            catch (e) {
                res.status(500).json({ mensaje: "ocurrió un error en el servidor" });
                console.error(e);
            }
        });
    }
    nuevaOperacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const operacion = req.body.operacion;
            try {
                let mensaje = yield agregar_operacion_1.default.crearOperacion(operacion);
                res.status(200).json({ mensaje: mensaje });
            }
            catch (e) {
                res.status(500).json({ mensaje: "ocurrió un error en el servidor" });
                console.error(e);
            }
        });
    }
    nuevoPrestamo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const prestamo = req.body.prestamo;
            try {
                let mensaje = yield agregar_prestamo_1.default.crearPrestamo(prestamo);
                res.status(200).json({ mensaje: mensaje });
            }
            catch (e) {
                res.status(500).json({ mensaje: "ocurrió un error en el servidor" });
                console.error(e);
            }
        });
    }
}
exports.default = new ControladorEntradas();
