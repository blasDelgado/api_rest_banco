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
const cliente_1 = __importDefault(require("../../model/cliente"));
const depositos_1 = __importDefault(require("../../model/depositos"));
const extracciones_1 = __importDefault(require("../../model/extracciones"));
const verificador_1 = __importDefault(require("./verificador"));
class AgregarOperacion {
    static crearDeposito(deposito) {
        return __awaiter(this, void 0, void 0, function* () {
            let mensaje;
            try {
                const cuentaV = yield verificador_1.default.verificaSiExiste(cliente_1.default, 'numero_de_cuenta', deposito.numero_de_cuenta);
                if (cuentaV == true) {
                    yield depositos_1.default.create(deposito);
                    mensaje = 'depósito creado con éxito';
                    return mensaje;
                }
                else {
                    mensaje = 'El numero de cuenta ingresado no existe';
                    console.error(mensaje);
                    return mensaje;
                }
            }
            catch (e) {
                console.error(e);
                mensaje =
                    'ocurrio un error al intentar crear el depósito, verifique los datos ingresados';
                return mensaje;
            }
        });
    }
    static crearExtraccion(extraccion) {
        return __awaiter(this, void 0, void 0, function* () {
            let mensaje;
            try {
                const cuentaV = yield verificador_1.default.verificaSiExiste(cliente_1.default, 'numero_de_cuenta', extraccion.numero_de_cuenta);
                if (cuentaV == true) {
                    yield extracciones_1.default.create(extraccion);
                    mensaje = 'extraccion creada con éxito';
                    return mensaje;
                }
                else {
                    mensaje = 'El numero de cuenta ingresado no existe';
                    console.error(mensaje);
                    return mensaje;
                }
            }
            catch (e) {
                console.error(e);
                mensaje =
                    'ocurrio un error al intentar crear la extraccion ,verifique los datos ingresados';
                return mensaje;
            }
        });
    }
    static crearOperacion(operacion) {
        return __awaiter(this, void 0, void 0, function* () {
            let mensaje;
            try {
                if ('id_extraccion' in operacion) {
                    mensaje = yield this.crearExtraccion(operacion);
                    return mensaje;
                }
                else {
                    mensaje = yield this.crearDeposito(operacion);
                    return mensaje;
                }
            }
            catch (e) {
                console.error(e);
                mensaje = 'ocurrió un error ,verifique los datos ingresado';
                return mensaje;
            }
        });
    }
}
exports.default = AgregarOperacion;
