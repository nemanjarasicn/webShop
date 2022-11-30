import { execute } from './db/mysql'

const _TB_NAME_ = "media"
const _TB_NAME_TYPE_ = "media_type"
const _TB_CATEGORY_MEDIA_ = "category_media"
const _TB_PRODUCT_MEDIA_ = "product_media"
const _TB_MEDIA_COMBINATION = 'product_combination_media'
const _TB_NAME_BLOG_MEDIA = "blog_media"

const getAll = async () =>{
    const sql = "SELECT `m`.??, `m`.??, `m`.??, `m`.?? as ??, `m`.??, `mt`.?? as ?? FROM ?? `m` " +
    "INNER JOIN ?? `mt` on `mt`.?? = `m`.??"
    const params = [`id`, `name`, `src_name`, `src_name`, `image`, `alt_text`, `name`, `type_name`, _TB_NAME_, _TB_NAME_TYPE_, `id`, `type_id`]

    return await execute({sql, params})
}

const deleteItem = async (id: number): Promise<boolean> => {
    let sql = "DELETE FROM " + _TB_CATEGORY_MEDIA_  + " WHERE `media_id` = ?"
    let queryParams = [id] as Array<string | number>
    await execute({sql, params: queryParams})

    sql ="DELETE FROM ?? WHERE ?? = ?"
    queryParams = [_TB_PRODUCT_MEDIA_, `media_id`, id]
    await execute({sql, params: queryParams})

    sql ="DELETE FROM ?? WHERE ?? = ?"
    queryParams = [_TB_NAME_BLOG_MEDIA, `media_id`, id]
    await execute({sql, params: queryParams})

    sql ="DELETE FROM ?? WHERE ?? = ?"
    queryParams = [_TB_MEDIA_COMBINATION, `media_id`, id]
    await execute({sql, params: queryParams})

    sql ="DELETE FROM ?? WHERE ?? = ?"
    queryParams = [_TB_NAME_, `id`, id]
    await execute({sql, params: queryParams})

    return true
}

const insert = async (params: {name: string, type_id: string, alt_text: string}, file) =>{
    const src_name = `assets/media/${file.filename}`

    const sql = "INSERT INTO ?? (??, ??, ??, ??) VALUES ( ?, ?, ?, ? )"
    const queryParams = [_TB_NAME_, `name`, `type_id`, `src_name`, `alt_text`, params.name, +params.type_id, src_name, params.alt_text]

    return await execute({sql, params: queryParams})
}

const getTypes = async () => {
    const sql = "SELECT ?? as ??, ?? as ?? FROM ??"
    const params = [`id`, `value`, `name`, `label`, _TB_NAME_TYPE_]

    return await execute({sql, params})
}

const getPickAll = async () =>{
    const sql = "SELECT ??, ??, ?? ,?? FROM ?? WHERE ?? = ?"
    const params = [`id`, `name`, `src_name`, `alt_text`, _TB_NAME_, `type_id`, 1]

    return await execute({sql, params})
}

export async function medias_endpoint(req, res){
    const action: string = req.params.action
    const params = req.body

    let returnValue: any = undefined

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
        default: res.status(404); break;
    }

    res.send(returnValue)
}
