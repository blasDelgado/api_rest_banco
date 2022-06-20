"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const datebase_1 = __importDefault(require("../datebase"));
class Prestamo extends sequelize_1.Model {
}
exports.default = Prestamo;
Prestamo.init({
    id_prestamo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    id_cliente: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad_prestada: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad_adeudada: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_de_otorgamiento: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    fecha_de_vencimiento: {
        type: sequelize_1.DataTypes.DATE,
    },
    id_sucursal_emisora: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, { sequelize: datebase_1.default, tableName: 'prestamo' });
