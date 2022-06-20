"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const datebase_1 = __importDefault(require("../datebase"));
class Sucursal extends sequelize_1.Model {
}
exports.default = Sucursal;
Sucursal.init({
    id_sucursal: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre_sucursal: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ciudad_sucursal: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    direccion_sucursal: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: datebase_1.default,
    tableName: 'sucursal',
});
