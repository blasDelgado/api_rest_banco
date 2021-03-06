"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const rutas_llamadas_1 = __importDefault(require("./routes/rutas-llamadas"));
const rutas_entradas_1 = __importDefault(require("./routes/rutas-entradas"));
const app = (0, express_1.default)();
//Middleweares
app.use((0, morgan_1.default)("dev"));
//Configuraciones
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//rutas
app.use(rutas_llamadas_1.default, rutas_entradas_1.default);
exports.default = app;
