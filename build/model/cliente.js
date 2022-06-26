"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const datebase_1 = __importDefault(require("../datebase"));
class Cliente extends sequelize_1.Model {
}
exports.default = Cliente;
Cliente.init({
    id_cliente: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    nombre_cliente: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    apellido_cliente: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    telefono_cliente: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    id_sucursal: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    numero_de_cuenta: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: datebase_1.default,
    tableName: 'cliente',
});
