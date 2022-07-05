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
const prestamo_1 = __importDefault(require("../../model/prestamo"));
const cliente_1 = __importDefault(require("../../model/cliente"));
const sucursal_1 = __importDefault(require("../../model/sucursal"));
const verificador_1 = __importDefault(require("./verificador"));
class AgregarPrestamo {
    static cambioDeEstadoDeDeuda(cuenta) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cliente = yield cuenta_1.default.update({
                    prestamos_pendientes: 1,
                }, {
                    where: {
                        numero_de_cuenta: cuenta,
                    },
                });
                console.log('Cambio el estado de deuda del cliente');
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    static crearPrestamo(prestamo) {
        return __awaiter(this, void 0, void 0, function* () {
            let mensaje;
            try {
                const cuentaV = yield verificador_1.default.verificaSiExiste(cliente_1.default, 'id_cliente', prestamo.id_cliente);
                const sucursalV = yield verificador_1.default.verificaSiExiste(sucursal_1.default, 'id_sucursal', prestamo.id_sucursal_emisora);
                if (cuentaV == true && sucursalV == true) {
                    yield prestamo_1.default.create(prestamo);
                    this.cambioDeEstadoDeDeuda(prestamo.id_cliente);
                    mensaje = 'Prestamo ingresado correctamente';
                    console.log(mensaje);
                    return mensaje;
                }
                else if (sucursalV === true) {
                    mensaje = 'Numero de cliente incorrecto';
                    console.error(mensaje);
                    return mensaje;
                }
                else if (cuentaV == true) {
                    mensaje = 'Numero de sucursal emisora incorrecta';
                    console.error(mensaje);
                    return mensaje;
                }
                else {
                    mensaje = 'Numero de cliente y sucursal incorrectos';
                    console.error(mensaje);
                    return mensaje;
                }
            }
            catch (e) {
                console.error(e);
                mensaje = 'ocurrió un error , verifique los datos ingresado';
                return mensaje;
            }
        });
    }
}
exports.default = AgregarPrestamo;
