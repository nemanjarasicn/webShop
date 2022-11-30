"use strict";
exports.__esModule = true;
exports.execute = void 0;
var mysql = require('mysql');
var local = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'arabika'
};
var prod = {
    connectionLimit: 10,
    host: '',
    user: '',
    password: '',
    database: ''
};
var pool = mysql.createPool(process.env.NODE_ENV === "production" ? prod : local);
function execute(param) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err)
                return reject(err); // not connected!
            // Use the connection
            var queryTmp = connection.query(param.sql, (param === null || param === void 0 ? void 0 : param.params) || [], function (error, results, fields) {
                // When done with the connection, release it.
                //console.log('result DB: ', JSON.parse(JSON.stringify(results)))
                var lastInsertID = results === null || results === void 0 ? void 0 : results.insertId;
                console.log(error);
                connection.release();
                // Handle error after the release.
                if (error)
                    reject(error);
                else if (param === null || param === void 0 ? void 0 : param.lastInsertId)
                    resolve(lastInsertID);
                else {
                    var toRes = JSON.parse(JSON.stringify(results || true));
                    resolve((param === null || param === void 0 ? void 0 : param.single) ? toRes[0] : toRes);
                }
            });
            console.log('sql', queryTmp.sql);
        });
    });
}
exports.execute = execute;
