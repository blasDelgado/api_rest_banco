"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const datebase_1 = __importDefault(require("../datebase"));
class Cuenta extends sequelize_1.Model {
}
exports.default = Cuenta;
Cuenta.init({
    numero_de_cuenta: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    saldo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    prestamos_pendientes: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
    },
    id_prestamo: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    sequelize: datebase_1.default,
    tableName: 'cuenta',
});
