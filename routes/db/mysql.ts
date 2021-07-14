import * as mysql from 'mysql'

export const pool: mysql.Pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'arabika'
})