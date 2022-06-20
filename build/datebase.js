"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("./config");
//contraseña ,nombre de base de datos y dialecto Variables globales
const sequelize = new sequelize_1.Sequelize('banco_del', 'root', config_1.password, {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        freezeTableName: true,
        timestamps: false,
    },
});
exports.default = sequelize;
