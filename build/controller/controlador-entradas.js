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
const agregar_cliente_1 = __importDefault(require("../clases/para_controlador_entradas/agregar-cliente"));
class ControladorEntradas {
    nuevoCliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cliente = req.body.cliente;
            const cuenta = req.body.cuenta;
            let mensaje;
            try {
                mensaje = yield agregar_cliente_1.default.crearCliente(cuenta, cliente);
                res.status(200).json({ mensaje: mensaje });
            }
            catch (e) {
                res.status(500).json({ mensaje: 'error en el servidor' });
                console.error(e);
            }
        });
    }
    nuevaSucursal() { }
    nuevaOperacion() { }
    nuevoPrestamo() { }
}
exports.default = new ControladorEntradas();
