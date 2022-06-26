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
exports.Verificador = exports.AgregarPrestamo = exports.AgregarSucursal = exports.AgregarOperacion = exports.AgregarCliente = void 0;
const cliente_1 = __importDefault(require("../../model/cliente"));
const cuenta_1 = __importDefault(require("../../model/cuenta"));
const depositos_1 = __importDefault(require("../../model/depositos"));
const extracciones_1 = __importDefault(require("../../model/extracciones"));
const sucursal_1 = __importDefault(require("../../model/sucursal"));
const prestamo_1 = __importDefault(require("../../model/prestamo"));
class AgregarCliente {
    static crearCliente(cuenta, cliente) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sucursalV = yield Verificador.verificaSiExiste(sucursal_1.default, 'id_sucursal', cliente.id_sucursal);
                if (sucursalV == true) {
                    const clienteCreado = yield cuenta_1.default.create(cuenta);
                    const numeroDeCuenta = clienteCreado.toJSON().numero_de_cuenta;
                    cliente.numero_de_cuenta = numeroDeCuenta;
                    yield cliente_1.default.create(cliente);
                }
                else {
                    console.error('La sucursal ingresada no existe');
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.AgregarCliente = AgregarCliente;
class AgregarOperacion {
    static crearDeposito(deposito) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cuentaV = yield Verificador.verificaSiExiste(cliente_1.default, 'numero_de_cuenta', deposito.numero_de_cuenta);
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
                const cuentaV = yield Verificador.verificaSiExiste(cliente_1.default, 'numero_de_cuenta', extraccion.numero_de_cuenta);
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
exports.AgregarOperacion = AgregarOperacion;
class AgregarSucursal {
    static crearSucursal(sucursal) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sucursal_1.default.create(sucursal);
                console.log('Sucursal agregada correctamente');
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.AgregarSucursal = AgregarSucursal;
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
            try {
                const cuentaV = yield Verificador.verificaSiExiste(cliente_1.default, 'id_cliente', prestamo.id_cliente);
                const sucursalV = yield Verificador.verificaSiExiste(sucursal_1.default, 'id_sucursal', prestamo.id_sucursal_emisora);
                if (cuentaV == true && sucursalV == true) {
                    prestamo_1.default.create(prestamo);
                    this.cambioDeEstadoDeDeuda(prestamo.id_cliente);
                    console.log('Prestamo ingresado correctamente');
                }
                else if (sucursalV == true) {
                    console.error('Numero de cliente incorrecto');
                }
                else if (cuentaV == true) {
                    console.error('Numero de sucursal emisora incorrecta');
                }
                else {
                    console.log('Numero de cliente y sucursal incorrectos');
                }
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.AgregarPrestamo = AgregarPrestamo;
class Verificador {
    static verificaSiExiste(modelo, quePropiedad, queAtributo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let consulta = {};
                //@ts-ignore
                consulta[quePropiedad] = queAtributo;
                const siExiste = yield modelo.findOne({
                    where: consulta,
                });
                let verificado;
                if (siExiste) {
                    verificado = true;
                }
                else {
                    verificado = false;
                }
                return verificado;
            }
            catch (e) {
                console.error(e);
                return false;
            }
        });
    }
}
exports.Verificador = Verificador;
