const mysql = require('mysql')

const local = {
    connectionLimit: 10,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'arabika'
}

const prod = {
    connectionLimit: 10,
    host     : '',
    user     : '',
    password : '',
    database : ''
}
const pool = mysql.createPool(process.env.NODE_ENV === "production" ? prod : local);

interface ExecuteQuery{
    sql: string,
    params?: Array<string | number | null | Date | number[] | string[]>,
    single?: boolean
    lastInsertId?: boolean
}

export function execute(param: ExecuteQuery){
    return new Promise((resolve, reject)=>{
        pool.getConnection(function(err, connection) {
            if (err) return reject(err); // not connected!

            // Use the connection
            const queryTmp = connection.query(param.sql, param?.params || [], function (error, results, fields) {
                // When done with the connection, release it.
                //console.log('result DB: ', JSON.parse(JSON.stringify(results)))
                const lastInsertID = results?.insertId
                console.log(error)
                connection.release();
                // Handle error after the release.

                if (error) reject(error)
                else if(param?.lastInsertId) resolve(lastInsertID)
                else {
                    let toRes = JSON.parse(JSON.stringify(results || true))
                    resolve(param?.single? toRes[0]: toRes)
                }
            });

            console.log('sql', queryTmp.sql)
        });
    })

}
