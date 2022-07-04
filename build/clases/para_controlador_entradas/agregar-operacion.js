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
            try {
                const cuentaV = yield verificador_1.default.verificaSiExiste(cliente_1.default, 'numero_de_cuenta', deposito.numero_de_cuenta);
                if (cuentaV == true) {
                    yield depositos_1.default.create(deposito);
                }
                else {
                    console.error('El numero de cuenta ingresado no existe');
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    static crearExtraccion(extraccion) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cuentaV = yield verificador_1.default.verificaSiExiste(cliente_1.default, 'numero_de_cuenta', extraccion.numero_de_cuenta);
                if (cuentaV == true) {
                    yield extracciones_1.default.create(extraccion);
                }
                else {
                    console.error('El numero de cuenta ingresado no existe');
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    static crearOperacion(operacion) {
        if ('id_extraccion' in operacion) {
            this.crearExtraccion(operacion);
        }
        else {
            this.crearDeposito(operacion);
        }
    }
}
exports.default = AgregarOperacion;
