"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const datebase_1 = __importDefault(require("./datebase"));
datebase_1.default.authenticate()
    .then(() => console.log('Conexión a base de datos establecida'))
    .catch((e) => console.log(e, "error conexión base de datos"));
const puerto = process.env.port || 3000;
app_1.default.listen(puerto, () => console.log(`Servidor establecido en el puerto: ${puerto}`));
