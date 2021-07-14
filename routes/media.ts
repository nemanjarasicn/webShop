import { pool } from './db/mysql'

const _TB_NAME_ = "`media`"
const _TB_NAME_TYPE_ = "`media_type`"

const getAll = () =>{
    return new Promise((res, rej)=>{
        const sql = "SELECT `m`.`id`, `m`.`name`, `m`.`src_name`, `m`.`src_name` as `image`, `m`.`alt_text`, `mt`.`name` as `type_name` FROM " + _TB_NAME_ + " `m` " +
        "INNER JOIN " + _TB_NAME_TYPE_ + " `mt` on `mt`.`id` = `m`.`type_id`"
        
        pool.query(sql, function (error, results, fields) {
            if(error) rej(false)
            res(JSON.parse(JSON.stringify(results || [])))
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

const insert = (params: {name: string, type_id: string, alt_text: string}, file) =>{
    return new Promise((res, rej)=>{
        let src_name: string = `assets/media/${file.filename}`

        const sql = "INSERT INTO " + _TB_NAME_ + " (`name`, `type_id`, `src_name`, `alt_text`) VALUES ( ?, ?, ?, ? )"
        const queryParams = [params.name, +params.type_id, src_name, params.alt_text]

        pool.query(sql, queryParams, function (error, results, fields) {
            if(error) rej(false)
            res(JSON.parse(JSON.stringify(true)))
        });
    })
}

const getTypes = () => {
    return new Promise((res, rej)=>{
        const sql = "SELECT `id`, `name` FROM " + _TB_NAME_TYPE_ 

        pool.query(sql, function (error, results, fields) {
            if(error) rej(false)
            res(JSON.parse(JSON.stringify(results)))
        });
    })
}

const getPickAll = () =>{
    return new Promise((res, rej)=>{
        const sql = "SELECT `id`, `name`, `src_name`, `alt_text` FROM " + _TB_NAME_ + " WHERE `type_id` = ?"
        const sqlParams = [1]
        pool.query(sql, sqlParams, function (error, results, fields) {
            if(error) rej(false)
            res(JSON.parse(JSON.stringify(results)))
        });
    })
}

export async function medias_endpoint(req, res){
    const action: string = req.params.action
    const params = req.body

    let returnValue: any = undefined

    //console.log(action, params)
    switch(action){
        case 'all':            
            returnValue = await getAll()
            res.status(200)
            break;
        case 'insert': 
            returnValue = await insert(params, req.file)
            res.status(200)
            break;
        case 'delete': 
            returnValue = await deleteItem(params.id)
            res.status(200)
            break;
        case 'getTypes':
            returnValue = await getTypes()
            res.status(200)
            break;
        case 'pickAll':
            returnValue = await getPickAll()
            res.status(200)
            break;

        default:  res.status(404); break;
    }

    res.send(returnValue)
}