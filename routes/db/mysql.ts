import * as mysql from 'mysql'

const pool: mysql.Pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'arabika'
})


module.exports = pool