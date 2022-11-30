import { execute } from './db/mysql'

const _TB_NAME_ = "location"

const getAll = async () =>{
    const sql = "SELECT * FROM " + _TB_NAME_
    return await execute({sql})
}

const getSingle = async (id: number) => {
    const sql = `SELECT * FROM ?? WHERE ?? = ?`
    const params = [_TB_NAME_,'id', id]

    return await execute({sql, params, single: true})
}

const deleteItem = async (id: number) => {
    const sql = "DELETE FROM ?? WHERE ?? = ?"
    const params = [_TB_NAME_, 'id', id]

    return await execute({sql, params})
}

const update = async (params: {name: string, delivery_tax: number | null, id: number}) =>{
    const sql = "UPDATE ??  SET ?? = ?, ?? = ? WHERE ?? = ?"
    const queryParams = [_TB_NAME_, `name`, params.name, `delivery_tax`, params.delivery_tax, `id`, params.id]

    return await execute({sql, params: queryParams})
}

const insert = async (params: {name: string, delivery_tax: number | null}) =>{
    const sql = `INSERT INTO ?? (??, ??) VALUES ( ?, ? )`
    const qParams = [_TB_NAME_, `name`, `delivery_tax`, params.name, params.delivery_tax]

    return await execute({sql, params: qParams})
}

export async function locations_endpoint(req, res){
    const action: string = req.params.action
    const params = req.body
    let returnValue: any = undefined

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
        default: res.status(404); break;
    }

    res.send(returnValue)
}
