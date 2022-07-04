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
const cuenta_1 = __importDefault(require("../../model/cuenta"));
const cliente_1 = __importDefault(require("../../model/cliente"));
const sucursal_1 = __importDefault(require("../../model/sucursal"));
const verificador_1 = __importDefault(require("./verificador"));
class AgregarCliente {
    static crearCliente(cuenta, cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            let mensaje;
            try {
                const sucursalV = yield verificador_1.default.verificaSiExiste(sucursal_1.default, 'id_sucursal', cliente.id_sucursal);
                if (sucursalV == true) {
                    const clienteCreado = yield cuenta_1.default.create(cuenta);
                    const numeroDeCuenta = clienteCreado.toJSON().numero_de_cuenta;
                    cliente.numero_de_cuenta = numeroDeCuenta;
                    yield cliente_1.default.create(cliente);
                    mensaje = 'Cliente ingresado correctamente';
                    return mensaje;
                }
                else {
                    mensaje = 'La sucursal ingresada no existe';
                    console.error(mensaje);
                    return mensaje;
                }
            }
            catch (e) {
                mensaje =
                    'Error , verifique los datos ingresados , recuerde ingresar un cliente y una cuenta con todos los campos requeridos';
                console.error(e);
                return mensaje;
            }
        });
    }
}
exports.default = AgregarCliente;
