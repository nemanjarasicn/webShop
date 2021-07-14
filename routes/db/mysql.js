"use strict";
exports.__esModule = true;
exports.pool = void 0;
var mysql = require("mysql");
exports.pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'arabika'
});
