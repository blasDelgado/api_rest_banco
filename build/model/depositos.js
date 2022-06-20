"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const datebase_1 = __importDefault(require("../datebase"));
class Depositos extends sequelize_1.Model {
}
exports.default = Depositos;
Depositos.init({
    id_deposito: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    monto_depositado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_de_deposito: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    numero_de_cuenta: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: datebase_1.default,
    tableName: 'depositos',
});
