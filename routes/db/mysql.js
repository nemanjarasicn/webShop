"use strict";
exports.__esModule = true;
var mysql = require("mysql");
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'arabika'
});
module.exports = pool;
