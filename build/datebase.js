"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("./config");
const sequelize = new sequelize_1.Sequelize('banco_del', config_1.user, config_1.password, {
    host: config_1.host,
    dialect: 'mysql',
    define: {
        freezeTableName: true,
        timestamps: false,
    },
});
exports.default = sequelize;
