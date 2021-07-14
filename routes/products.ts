import { pool } from './db/mysql'

const _TB_NAME_PRODUCTS = "`product`"
const _TB_NAME_CATEGORY = "`product_category`"
const _TB_NAME_CATEGORY_MEDIA = "`category_media`"
const _TB_NAME_MEDIA = "`media`"
const _TB_NAME_DISCOUNT = "`discount`"

//categories
const getAllParentCategories = () =>{
    return new Promise((res, rej)=>{
        const sql = "SELECT `id`, `name` FROM " + _TB_NAME_CATEGORY + " WHERE `parent_cat` IS NULL" 

        pool.query(sql, function (error, results, fields) {
            if(error) rej(false)
            res(JSON.parse(JSON.stringify(results || [])))
        });
    })
}

const getAllCategories = () =>{
    return new Promise((res, rej)=>{
        const sql = "SELECT `c`.`id`, `c`.`name`, `c`.`featured`, `c2`.`name` as `parent_cat`, `m`.`src_name` as `image` FROM " + _TB_NAME_CATEGORY  + "  `c` " +
        " LEFT JOIN " + _TB_NAME_CATEGORY + " `c2` on `c2`.`id` = `c`.`parent_cat` " +
        " LEFT JOIN " + _TB_NAME_CATEGORY_MEDIA + " `cm` ON `cm`.`category_id` = `c`.`id`" +
        " LEFT JOIN " + _TB_NAME_MEDIA + " `m` on `m`.`id` = `cm`.`media_id`" 
        
        pool.query(sql, function (error, results, fields) {
            if(error) rej(false)
            res(JSON.parse(JSON.stringify(results || [])))
        });
    })
}


const getSingleCategory = (id: number) => {
    return new Promise((res, rej)=>{
        let completeResponse

        new Promise((resIN, rejIN)=>{
            const sql = "SELECT `c`.`name`, `c`.`featured`, `c`.`parent_cat` FROM " + _TB_NAME_CATEGORY  + "  `c`  WHERE `c`.`id` = ? " 
            const queryParams = [id]
    
            pool.query(sql, queryParams, function (error, results, fields) {
                if(error)return rej(false)
                completeResponse = JSON.parse(JSON.stringify(results[0] || null))

                resIN(true)
            });
        }).then(result => {
            const sql = "SELECT `m`.`id`, `m`.`src_name`, `m`.`alt_text` FROM " + _TB_NAME_MEDIA + " `m` " +
            " INNER JOIN " + _TB_NAME_CATEGORY_MEDIA + " `cm` ON `cm`.`media_id` = `m`.`id` " +
            " WHERE `cm`.`category_id` = ? "
            const queryParams = [id]

            pool.query(sql, queryParams, function (error, results, fields) {
                if(error) return rej(false)
                
                completeResponse.image = results
                
                res(completeResponse)
            });            
        })
    })
}

const deleteCategory = (id: number) => {
    return new Promise((res, rej)=>{
        const sql = "DELETE FROM " + _TB_NAME_CATEGORY + " WHERE `id` = ? "
        const queryParams = [id]

        pool.query(sql, queryParams, function (error, results, fields) {
            if(error) rej(false)
            res(JSON.parse(JSON.stringify(true)))
        });
    })
}

const updateCategory = (params: {name: string, featured: boolean | null, parent_cat: number | null, id: number}) =>{
    return new Promise((res, rej)=>{
        new Promise((resIN, rejIN) =>{
            const sql = "UPDATE " + _TB_NAME_CATEGORY + "  SET `name` = ?, `featured` = ? , `parent_cat` = ? WHERE `id` = ?"
            const queryParams = [params.name, params.featured === true? 1 : 0, params.parent_cat, params.id]
    
            pool.query(sql, queryParams, function (error, results, fields) {
                if(error) return rej(false)
                resIN(true)
            });
        }).then(result=>{

            res(JSON.parse(JSON.stringify(true)))
        })
    })
}

const insertCategory = (params: {name: string, featured: boolean | null, parent_cat: number | null, image: {id: number, src_name: string, alt_text: string}[]}) =>{
    return new Promise((res, rej)=>{
        new Promise((resIN, rejIN)=>{
            const sql = "INSERT INTO " + _TB_NAME_CATEGORY + " (`name`, `featured`, `parent_cat`) VALUES ( ?, ?, ? )"
            const queryParams = [params.name, params.featured === true? 1 : 0, params.parent_cat]
            pool.query(sql, queryParams, function (error, results, fields) {
                if(error) return rej(false)
                resIN(results.insertId)
            });
        }).then((result)=>{
            //insert media
            if((result !== null || result !== undefined) && params.image?.length > 0){
                const lastInsertedCatID = result
                params.image.forEach(img=>{
                    const sql = "INSERT INTO " + _TB_NAME_CATEGORY_MEDIA + " (`category_id`, `media_id`) VALUES (?, ?)"
                    const queryParams = [lastInsertedCatID, img.id]
                    pool.query(sql, queryParams, function (error, results, fields) {
                        if(error) return rej(false)
                    });
                })
                
                return res(JSON.parse(JSON.stringify(true)))
            }

            res(JSON.parse(JSON.stringify(true)))
        })
    })
}

//discounts
const getAllDiscounts = () =>{
    return new Promise((res, rej)=>{
        const sql = "SELECT * FROM " + _TB_NAME_DISCOUNT
        
        pool.query(sql, function (error, results, fields) {
            if(error) rej(false)
            res(JSON.parse(JSON.stringify(results || [])))
        });
    })
}


const getSingleDiscount = (id: number) => {
    return new Promise((res, rej)=>{
        const sql = "SELECT * FROM " + _TB_NAME_DISCOUNT +
        " WHERE `id` = ? " 
        const queryParams = [id]

        pool.query(sql, queryParams, function (error, results, fields) {
            if(error) rej(false)
            res(JSON.parse(JSON.stringify(results[0] || null)))
        });
    })
}

const deleteDiscount = (id: number) => {
    return new Promise((res, rej)=>{
        const sql = "DELETE FROM " + _TB_NAME_DISCOUNT + " WHERE `id` = ? "
        const queryParams = [id]

        pool.query(sql, queryParams, function (error, results, fields) {
            if(error) rej(false)
            res(JSON.parse(JSON.stringify(true)))
        });
    })
}

const updateDiscount = (params: {name: string, percentage_value: number, start_at: string | null, end_at: string | null, promo_code: string | null, id: number}) =>{
    return new Promise((res, rej)=>{
        const sql = "UPDATE " + _TB_NAME_DISCOUNT + "  SET `name` = ?, `percentage_value` = ? , `start_at` = ?, `end_at` = ?, `promo_code` = ? WHERE `id` = ?"
        const queryParams = [params.name, params.percentage_value, params.start_at, params.end_at, params.promo_code, params.id]

        pool.query(sql, queryParams, function (error, results, fields) {
            if(error) rej(false)
            res(JSON.parse(JSON.stringify(true)))
        });
    })
}

const insertDiscount = (params: {name: string, percentage_value: string, start_at: string | null, end_at: string | null, promo_code: string | null}) =>{
    return new Promise((res, rej)=>{
        const sql = "INSERT INTO " + _TB_NAME_DISCOUNT + " (`name`, `percentage_value`, `start_at`, `end_at`, `promo_code`) VALUES ( ?, ?, ?, ?, ? )"
        const queryParams = [params.name, +params.percentage_value, params.start_at, params.end_at, params.promo_code]

        pool.query(sql, queryParams, function (error, results, fields) {
            if(error) rej(false)
            res(JSON.parse(JSON.stringify(true)))
        });
    })
}

export async function products_endpoint(req, res){
    const action: string = req.params.action
    const params = req.body
    let returnValue: any = undefined

    console.log(action, params)
    switch(action){
        //categories
        case 'all_parent_categories': 
            returnValue = await getAllParentCategories()
            res.status(200)
            break;
        case 'all_categories':            
            returnValue = await getAllCategories()
            res.status(200)
            break;
        case 'insert_category': 
            returnValue = await insertCategory(params)
            res.status(200)
            break;
        case 'update_category': 
            returnValue = await updateCategory(params)
            res.status(200)
            break;
        case 'delete_category': 
            returnValue = await deleteCategory(params.id)
            res.status(200)
            break;
        case 'single_category':
            returnValue = await getSingleCategory(params.id)
            res.status(200)
            break;
        //discounts
        case 'all_discounts':            
            returnValue = await getAllDiscounts()
            res.status(200)
            break;
        case 'insert_discount': 
            returnValue = await insertDiscount(params)
            res.status(200)
            break;
        case 'update_discount': 
            returnValue = await updateDiscount(params)
            res.status(200)
            break;
        case 'delete_discount': 
            returnValue = await deleteDiscount(params.id)
            res.status(200)
            break;
        case 'single_discount':
            returnValue = await getSingleDiscount(params.id)
            res.status(200)
            break;

        default:  res.status(404); break;
    }

    res.send(returnValue)
}