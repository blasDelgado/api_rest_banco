"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.host = exports.user = exports.password = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.password = process.env.password || "1234";
exports.user = process.env.user || "root";
exports.host = process.env.host || "localhost";
