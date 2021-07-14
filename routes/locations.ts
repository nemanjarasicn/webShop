//@ts-ignore
const pool = require('./db/mysql')

const _TB_NAME_ = "`location`"

const getAll = () =>{
    return new Promise((res, rej)=>{
        const sql = "SELECT * FROM " + _TB_NAME_
        
        pool.query(sql, function (error, results, fields) {
            if(error) rej(false)
            res(JSON.parse(JSON.stringify(results || [])))
        });
    })
}

const getSingle = (id: number) => {
    return new Promise((res, rej)=>{
        const sql = "SELECT * FROM " + _TB_NAME_ +
        " WHERE `id` = ? " 
        const queryParams = [id]

        pool.query(sql, queryParams, function (error, results, fields) {
            if(error) rej(false)
            res(JSON.parse(JSON.stringify(results[0] || null)))
        });
    })
}

const deleteItem = (id: number) => {
    return new Promise((res, rej)=>{
        const sql = "DELETE FROM " + _TB_NAME_ + " WHERE `id` = ? "
        const queryParams = [id]

        pool.query(sql, queryParams, function (error, results, fields) {
            if(error) rej(false)
            res(JSON.parse(JSON.stringify(true)))
        });
    })
}

const update = (params: {name: string, delivery_tax: number | null, id: number}) =>{
    return new Promise((res, rej)=>{
        const sql = "UPDATE " + _TB_NAME_ + "  SET `name` = ?, `delivery_tax` = ? WHERE `id` = ?"
        const queryParams = [params.name, params.delivery_tax, params.id]

        pool.query(sql, queryParams, function (error, results, fields) {
            if(error) rej(false)
            res(JSON.parse(JSON.stringify(true)))
        });
    })
}

const insert = (params: {name: string, delivery_tax: number | null}) =>{
    return new Promise((res, rej)=>{
        const sql = "INSERT INTO " + _TB_NAME_ + " (`name`, `delivery_tax`) VALUES ( ?, ? )"
        const queryParams = [params.name, params.delivery_tax]

        pool.query(sql, queryParams, function (error, results, fields) {
            if(error) rej(false)
            res(JSON.parse(JSON.stringify(true)))
        });
    })
}

export async function locations_endpoint(req, res){
    const action: string = req.params.action
    const params = req.body
    let returnValue: any = undefined

    console.log(action, params)
    switch(action){
        case 'all':            
            returnValue = await getAll()
            res.status(200)
            break;
        case 'insert': 
            returnValue = await insert(params)
            res.status(200)
            break;
        case 'update': 
            returnValue = await update(params)
            res.status(200)
            break;
        case 'delete': 
            returnValue = await deleteItem(params.id)
            res.status(200)
            break;
        case 'single':
            returnValue = await getSingle(params.id)
            res.status(200)
            break;

        default:  res.status(404); break;
    }

    res.send(returnValue)
}