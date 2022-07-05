"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlador_entradas_1 = __importDefault(require("../controller/controlador-entradas"));
const router = (0, express_1.Router)();
router.post('/banco/crear-cliente', controlador_entradas_1.default.nuevoCliente);
router.post('/banco/crear-sucursal', controlador_entradas_1.default.nuevaSucursal);
router.post('/banco/crear-operacion', controlador_entradas_1.default.nuevaOperacion);
router.post('/banco/crear-prestamo', controlador_entradas_1.default.nuevoPrestamo);
exports.default = router;
