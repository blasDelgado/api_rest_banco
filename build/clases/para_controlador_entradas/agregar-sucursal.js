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
const sucursal_1 = __importDefault(require("../../model/sucursal"));
class AgregarSucursal {
    static crearSucursal(sucursal) {
        return __awaiter(this, void 0, void 0, function* () {
            let mensaje;
            try {
                yield sucursal_1.default.create(sucursal);
                mensaje = 'Sucursal agregada correctamente';
                console.log(mensaje);
                return mensaje;
            }
            catch (e) {
                console.error(e);
                mensaje =
                    'Error al intentar crear una nueva sucursal , verifique los datos ingresados';
                return mensaje;
            }
        });
    }
}
exports.default = AgregarSucursal;
