import { execute } from './db/mysql'
import {ProductEnumSingle, ProductEnumSingleArr} from "./enums/product-enum";
import * as productAddOn from "./productAddOn";

const _TB_NAME_PRODUCTS = "product"
const _TB_NAME_PRODUCTS_MEDIA = "product_media"
const _TB_NAME_CATEGORY = "product_category"
const _TB_NAME_CATEGORY_MEDIA = "category_media"
const _TB_NAME_MEDIA = "media"
const _TB_NAME_DISCOUNT = "discount"
const _TB_NAME_ASSESSMENT = "product_assessment"
const _TB_NAME_ADD_ON_LIST = "product_add_on_list"
const _TB_NAME_PRODUCT_COMBINATION_ITEM = 'product_combination_item'

//categories
const getAllParentCategories = async () =>{
    const sql = "SELECT ?? as ??, ?? as ?? FROM ??" //+ " WHERE `parent_cat` IS NULL"
    const params = [`id`, `value`, `name`, `label`,  _TB_NAME_CATEGORY]

    return await execute({sql, params})
}

const getAllCategories = async () =>{
    let completeResponse

    let sql = `SELECT c.??, c.??, c.??, c2.?? as ?? FROM ?? c LEFT JOIN ?? c2 ON c2.?? = c.??`
    let queryParams = [
        'id',
        'name',
        'featured',
        'name',
        'parent_cat',
        _TB_NAME_CATEGORY,
        _TB_NAME_CATEGORY,
        'id',
        'parent_cat',
    ]
    completeResponse = await execute({sql, params: queryParams})

    if(completeResponse?.length > 0){
        const tmp = completeResponse

        let i = 0
        for(let row of tmp){
            completeResponse[i++].image = await getImageForCategory(row.id)
        }
    }


    return completeResponse
}

const getImageForCategory = async (id): Promise<{
    id:number,
    src_name: string,
    alt_text?:string
}> => {
    // take main_image
    let sql = `SELECT m.??, m.??, m.?? FROM ?? m INNER JOIN ?? cm ON cm.?? = m.?? WHERE cm.?? = ? AND cm.?? = ?`
    let queryParams = [
        'id',
        'src_name',
        'alt_text',
        _TB_NAME_MEDIA,
        _TB_NAME_CATEGORY_MEDIA,
        'media_id',
        'id',
        'category_id',
        id,
        'main',
        1
    ]

    const tmpImage = await execute({sql, params: queryParams, single: true}) as {id: number, src_name: string, alt_text: string}
    return {
        id: tmpImage?.id,
        src_name: tmpImage?.src_name,
        alt_text: tmpImage?.alt_text
    }
}

const getAllCategoriesMenu = async () =>{
    let completeResponse

    let sql = `SELECT c.??, c.?? AS ??, (c.?? IS NOT NULL) AS ??, c.?? FROM ??  c ORDER BY c.??, c.?? DESC`
    let queryParams = [
        'id',
        'name',
        'label',
        'parent_cat',
        'parent',
        'featured',
        _TB_NAME_CATEGORY,
        'parent_cat',
        'featured'
    ]

    completeResponse = await execute({sql, params: queryParams})

    if(completeResponse?.length > 0){
        const tmp = completeResponse

        let i = 0
        for(let row of tmp){
            completeResponse[i++].image = await getImageForCategory(row.id)
        }
    }

    return completeResponse
}

const getAllParentCategoriesView = async () =>{
    const sql = "SELECT ??, ?? as ?? FROM ?? WHERE ?? IS NULL ORDER BY ?? DESC"
    const params = [`id`, `name`, `label`, _TB_NAME_CATEGORY, `parent_cat`, `featured`]

    return await execute({sql, params})

}

const getCategoriesWithImg = async () => {
    let completeResponse

    const sql = "SELECT `c`.`id`, `c`.`name` as `label` FROM " + _TB_NAME_CATEGORY  + "  `c` " +
    " INNER JOIN " + _TB_NAME_CATEGORY_MEDIA + " `cm` ON `cm`.`category_id` = `c`.`id`" +
    " INNER JOIN " + _TB_NAME_MEDIA + " `m` on `m`.`id` = `cm`.`media_id`" +
    " WHERE `m`.`src_name` IS NOT NULL ORDER BY `c`.`parent_cat`, `c`.`featured` DESC LIMIT 12"

    completeResponse =  await execute({sql})
    if(completeResponse?.length > 0){
        const tmp = completeResponse

        let i = 0
        for(let row of tmp){
            completeResponse[i++].image = await getImageForCategory(row.id)
        }
    }

    return completeResponse
}


const getSingleCategory = async (id: number) => {
    let sql = `SELECT c.??, c.??, c.?? FROM ??  c WHERE c.?? = ?`
    let params = ['name', 'featured', 'parent_cat', _TB_NAME_CATEGORY, 'id', id]

    let completeResponse = await execute({sql, params, single: true})
    completeResponse['image'] = await getImageForCategory(id)

    return completeResponse
}

const deleteCategory = async (id: number): Promise<boolean> => {
    let sql = "DELETE FROM ?? WHERE ?? = ? "
    let params = [_TB_NAME_CATEGORY_MEDIA, `category_id`, id]
    await execute({sql, params})

    sql = "UPDATE ?? SET ?? = NULL WHERE ?? = ? "
    params = [_TB_NAME_CATEGORY, `parent_cat`, `id`, id]
    await execute({sql, params})

    sql = "UPDATE ??  SET ?? = NULL WHERE ?? = ? "
    params = [_TB_NAME_PRODUCTS, `product_category_id`, `product_category_id`, id]
    await execute({sql, params})

    sql = "DELETE FROM ?? WHERE ?? = ? "
    params = [_TB_NAME_CATEGORY, `id`, id]
    await execute({sql, params})

    return true
}

const deleteCategoryMedia = async (cat_id: number, media_id: number): Promise<boolean>=>{
    const sql = "DELETE FROM ?? WHERE ?? = ? AND ?? = ?"
    const params = [_TB_NAME_CATEGORY_MEDIA, `category_id`, `media_id`, cat_id, media_id]
    await execute({sql, params})

    return true
}

const updateCategoryMedia = async (cat_id: number, image: {id: number, src_name: string, alt_text?: string}[]): Promise<boolean> =>{
    if(image === null || image?.length < 1) return true

    let i = 0
    for(let img of image){
        let sql = "INSERT INTO ?? (??, ??"
        let params = [_TB_NAME_CATEGORY_MEDIA, `category_id`, `media_id`, cat_id, img.id]

        if(i === 0){
            sql += ", `main`) VALUES (?, ?, ?)"
            params.push(1)
        }else sql += ") VALUES (?, ?)"

         await execute({sql, params})
        i++
    }

    return true
}

const updateCategory = async (params: {name: string, featured: boolean | null, parent_cat: number | null, id: number, image: {id: number, src_name: string, alt_text?: string}[]}) =>{
    const sql = "UPDATE ??  SET ?? = ?, ?? = ? , ?? = ? WHERE ?? = ?"
    const queryParams = [_TB_NAME_CATEGORY, `name`, params.name, `featured`,  params.featured === true? 1 : 0, `parent_cat`, params.parent_cat ? params.parent_cat: null, `id`, params.id]

    await execute({sql, params: queryParams})

    return await updateCategoryMedia(params.id, params.image) !== false
}

const insertCategory = async (params: {name: string, featured: boolean | null, parent_cat: number | null, image: {id: number, src_name: string, alt_text: string}[]}) =>{
    const sql = "INSERT INTO ?? (??, ??, ??) VALUES ( ?, ?, ? )"
    const queryParams = [_TB_NAME_CATEGORY , `name`, `featured`, `parent_cat`, params.name, params.featured === true? 1 : 0, params.parent_cat ? params.parent_cat: null]
    const result = await execute({sql, params: queryParams, lastInsertId: true})

    //insert media
    if((result !== null || true) && params.image?.length > 0){
        if(await updateCategoryMedia(+result, params.image) === false) return false
    }

    return true
}

//discounts
const getAllDiscounts = async () =>{
    const sql = `SELECT ??, ??, ??, DATE_FORMAT(??, "%d/%m/%Y") as start_at, DATE_FORMAT(??, "%d/%m/%Y") as end_at, ??, ?? FROM ??`
    const params = [
        'id',
        'name',
        'percentage_value',
        'start_at',
        'end_at',
        'promo_code',
        'description',
        _TB_NAME_DISCOUNT
    ]

    return await execute({sql, params})
}

const getSingleDiscount = async (id: number) => {
    const sql = `SELECT ??, ??, ??,  DATE_FORMAT(??, "%Y-%m-%d") as start_at, DATE_FORMAT(??, "%Y-%m-%d") as end_at,  ??, ?? FROM ?? WHERE ?? = ?`
    const params = [
        'id',
        'name',
        'percentage_value',
        'start_at',
        'end_at',
        'promo_code',
        'description',
        _TB_NAME_DISCOUNT,
        `id`,
        id
    ]

    return await execute({sql, params, single: true})
}

const deleteDiscount = async (id: number) => {
    let sql = "UPDATE ?? SET ?? = NULL WHERE ?? = ?"
    let params = [_TB_NAME_PRODUCTS, `discount_id`, `discount_id`, id]
    await execute({sql, params})
        
    sql = "DELETE FROM ?? WHERE ?? = ? "
    params = [_TB_NAME_DISCOUNT, `id`, id]
    await execute({sql, params})

    return true
}

const updateDiscount = async (params: {
    name: string,
    percentage_value: number,
    start_at: string | null,
    end_at: string | null,
    promo_code: string | null,
    description: string | null,
    id: number
}) =>{
    const sql = "UPDATE " + _TB_NAME_DISCOUNT + "  SET `name` = ?, `percentage_value` = ? , `start_at` = ?, `end_at` = ?, `promo_code` = ?, `description` = ? WHERE `id` = ?"
    const queryParams = [params.name, params.percentage_value, params.start_at, params.end_at, params.promo_code, params.description, params.id]
    await execute({sql, params: queryParams})

    return true
}

const insertDiscount = async (params: {name: string, percentage_value: string, start_at: string | null, end_at: string | null, promo_code: string | null, description: string | null,}) =>{
    const sql = "INSERT INTO " + _TB_NAME_DISCOUNT + " (`name`, `percentage_value`, `start_at`, `end_at`, `promo_code`, `description`) VALUES ( ?, ?, ?, ?, ?, ? )"
    const queryParams = [params.name, +params.percentage_value, params.start_at, params.end_at, params.promo_code, params.description]

    await execute({sql, params: queryParams})

    return true
}

const getAllActiveDiscounts = async () =>{
    const sql = "SELECT `id`, `name`, `percentage_value`, DATE_FORMAT(`start_at`, \"%d %m %Y\") AS `start_at`, DATE_FORMAT(`end_at`, \"%d %m %Y\") AS `end_at`, `promo_code`, `description` FROM " +
     _TB_NAME_DISCOUNT + " WHERE (`start_at` IS NULL AND `end_at` IS NULL) OR (NOW() BETWEEN `start_at` AND `end_at`) AND `promo_code` IS NOT NULL "

    return await execute({sql})
}

//products
const getAllProducts = async (custom? :{customSql: string, customParams: any[]}) =>{
    let sql = 'SELECT `p`.`id`, `p`.`name`, `c`.`name` as `category`, CONCAT( `p`.`price`, " rsd.") as price, ' +
    ' CONCAT( IFNULL(`d`.`name`, "Nema popusta"), "( ", IFNULL(`d`.`percentage_value`, " "), " % )" ) as `discount`, ' +
    " ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price`, `p`.`active` FROM " + _TB_NAME_PRODUCTS + " `p`" +
    " LEFT JOIN " + _TB_NAME_CATEGORY + " `c` ON `c`.`id` = `p`.`product_category_id`" +
    " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` "
    let queryParams = []

    // TODO; add interface
    let completeResponse: any = await execute({
        sql: custom?.customSql || sql,
        params: custom?.customParams || queryParams
    })

    if(completeResponse?.length > 0){
        const tmp = completeResponse

        let i = 0
        for(let row of tmp){
            //set assessment
            completeResponse[i].assesssment = await getAssessmentForProduct(row['id'])

            // take main_image
            sql = "SELECT `m`.`id`, `m`.`src_name`, `m`.`alt_text` FROM " + _TB_NAME_MEDIA + " `m` " +
                " INNER JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`media_id` = `m`.`id` " +
                " WHERE `pm`.`product_id` = ? AND `pm`.`main` = ?"
            queryParams = [row['id'], 1]

            const tmpImage = await execute({sql, params: queryParams, single: true}) as {id: number, src_name: string, alt_text: string}
            completeResponse[i].image = {
                id: tmpImage?.id,
                src_name: tmpImage?.src_name,
                alt_text: tmpImage?.alt_text
            }

            //set gallery
            sql = "SELECT `m`.`src_name` FROM " + _TB_NAME_MEDIA + " `m` "+
            " INNER JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`media_id` = `m`.`id` " +
            " WHERE `pm`.`product_id` = ? ORDER BY `pm`.`main` DESC"
            queryParams = [row['id']]

            completeResponse[i].gallery = await execute({sql, params: queryParams})

            // take options
            completeResponse[i].options = await productAddOn.getAll(row['id'])
            i++
        }
    }

    return completeResponse
}

const getAllProductCategories = async () => {
    const sql = "SELECT ?? as ??, ?? as ?? FROM ??"
    const params = [`id`, 'value', `name`, 'label', _TB_NAME_CATEGORY]

    return await execute({sql, params})
}

const getAllProductDiscounts = async () => {
    const sql = "SELECT ?? as ??, ?? as ?? FROM ??"
    const params = [`id`, 'value', `name`, 'label', _TB_NAME_DISCOUNT]

    return await execute({sql, params})
}

export const getSingleProduct = async (id: number, custom? :{customSql: string, customParams: any[]}) => {
    // take all info from `product` table
    let sql = "SELECT * FROM " + _TB_NAME_PRODUCTS + " WHERE `id` = ?"
    let params = [id]
    let completeResponse = await execute({sql: custom?.customSql || sql, params: custom?.customParams || params, single: true})

    // take main_image
    sql = "SELECT `m`.`id`, `m`.`src_name`, `m`.`alt_text` FROM " + _TB_NAME_MEDIA + " `m` " +
    " INNER JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`media_id` = `m`.`id` " +
    " WHERE `pm`.`product_id` = ? AND `pm`.`main` = ?"
    params = [id, 1]

    if(completeResponse) {
        const tmpImage = await execute({sql, params, single: true}) as {id: number, src_name: string, alt_text: string}
        completeResponse['image'] = {
            id: tmpImage?.id,
            src_name: tmpImage?.src_name,
            alt_text: tmpImage?.alt_text
        }

        // take images (gallery)
        sql = "SELECT `m`.`id`, `m`.`src_name`, `m`.`alt_text` FROM " + _TB_NAME_MEDIA + " `m` " +
            " INNER JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`media_id` = `m`.`id` " +
            " WHERE `pm`.`product_id` = ? AND `pm`.`main` IS NULL"
        params = [id]
        completeResponse['gallery'] = await execute({sql, params})

        // take options
        completeResponse['options'] = await productAddOn.getAll(completeResponse['id'])
    }

    return completeResponse
}

const deleteProduct = async (id: number): Promise<boolean> => {
    let sql = "DELETE FROM ?? WHERE ?? = ? "

    let params = [_TB_NAME_PRODUCTS_MEDIA, `product_id`, id]
    await execute({sql, params})

    params= [_TB_NAME_ASSESSMENT, `product_id`, id]
    await execute({sql, params})

    params= [_TB_NAME_ASSESSMENT, `product_id`, id]
    await execute({sql, params})

    params= [_TB_NAME_ADD_ON_LIST, `product_id`, id]
    await execute({sql, params})

    params= [_TB_NAME_PRODUCT_COMBINATION_ITEM, `product_id`, id]
    await execute({sql, params})

    params= [_TB_NAME_PRODUCTS, `id`, id]
    await execute({sql, params})

    return true
}

const deleteProductMedia = async (prod_id: number, media_id: number): Promise<boolean>=>{
    const sql = "DELETE FROM ?? WHERE ?? = ? AND ?? = ?"
    const params = [_TB_NAME_PRODUCTS_MEDIA, `product_id`, prod_id, `media_id`, media_id]

    await execute({sql, params})

    return true
}

const updateProductMedia = async (prod_id: number, image: {id: number, src_name: string, alt_text?: string}[]): Promise<boolean> =>{

    if( image === null || image?.length < 1 ) return true

    let i = 0
    for(let img of image){
        let sql = "INSERT INTO ?? (??, ??"
        let queryParams = [_TB_NAME_PRODUCTS_MEDIA, `product_id`, `media_id`, prod_id, img.id]

        if(i === 0){
            sql += ", `main`) VALUES (?, ?, ?)"
            queryParams.push(1)
        }else sql += ") VALUES (?, ?)"


        await execute({sql, params: queryParams})
        i++
    }

    return true
}

const getAllProductsCustom = async (type?: ProductEnumSingleArr, param?: any) =>{
    let customSql: string
    let customParams: Array<string | null | number | string[] | number[]>

    switch (type){
        case ProductEnumSingleArr.BEST_ASSESSMENT:
            customSql = "SELECT `p`.`id`, `p`.`name`, `p`.`price`, " +
                " `d`.`percentage_value` as `discount`, ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price` " +
                "FROM " + _TB_NAME_PRODUCTS + " `p`" +
                " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` " +
                " WHERE `p`.`active` = ? LIMIT ?"
            customParams = [1, param.limit]
            break;

        case ProductEnumSingleArr.CART_WISHLIST:
            customSql = "SELECT `p`.`id`, `p`.`name`, `p`.`price`, " +
            " `d`.`percentage_value` as `discount`, ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price` " +
            " FROM " + _TB_NAME_PRODUCTS + " `p`" +
            " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` " +
            " WHERE `p`.`id` IN (?)"
            customParams = [param?.ids.length < 1? null: param.ids]
            break;

        case ProductEnumSingleArr.RELATED:
            customSql = "SELECT `p`.`id`, `p`.`name`, `p`.`price`, " +
                " `d`.`percentage_value` as `discount`, ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price` " +
                " FROM " + _TB_NAME_PRODUCTS + " `p`" +
                " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` " +
                " LEFT JOIN " + _TB_NAME_CATEGORY + " `c` on `c`.`id` = `p`.`product_category_id` " +
                " WHERE `c`.`id` = ? AND `p`.`id` != ?"
            customParams = [param.categoryId, param.productId]
            break;
    }
        
    return await getAllProducts({customSql, customParams})
}

const getSingleProductCustom = async (product_id: number, type: ProductEnumSingle) =>{
    let customSql: string
    let customParams: Array<string | number | Date | string[] | number[] | null>

    switch (type){
        case ProductEnumSingle.BASIC:
            customSql= "SELECT `p`.`id`, `p`.`name`, `p`.`price`, `p`.`description`, `c`.`name` as `category`, " +
            " `d`.`percentage_value` as `discount`, ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price` " +
            " FROM " + _TB_NAME_PRODUCTS + " `p`" +
            " LEFT JOIN " + _TB_NAME_CATEGORY + " `c` on `c`.`id` = `p`.`product_category_id` " +
            " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` " +
            " WHERE `p`.`id` = ?"
            customParams= [product_id]
            break;
        case ProductEnumSingle.DETAIL:
            customSql= "SELECT `p`.`id`, `p`.`name`, `p`.`price`, " +
                " `c`.`name` as `product_category_name`, `p`.`product_category_id`, " +
                " `d`.`percentage_value` as `discount`, ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price` " +
                " FROM " + _TB_NAME_PRODUCTS + " `p`" +
                " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` " +
                " LEFT JOIN " + _TB_NAME_CATEGORY + " `c` on `c`.`id` = `p`.`product_category_id` " +
                " WHERE `p`.`id` = ?"
            customParams= [product_id]
            break;
    }


    // TODO: add interface
    const product: any = await getSingleProduct(product_id, {customSql, customParams})
    product.assesssment = await getAssessmentForProduct(product_id)

    return product
}

const updateProduct = async (params: {
    id: number, 
    name: string, 
    description: string | null,
    discount_id: number | null,
    price: string,
    featured: boolean | null, 
    active: boolean | null, 
    product_category_id: number | null, 
    unique_number: string | null,
    delivery_matter: boolean | null,
    barcode: string | null,
    image: {id: number, src_name: string, alt_text?: string}[]}) =>{
    let sql = "UPDATE " + _TB_NAME_PRODUCTS + "  SET `name` = ?, `featured` = ?, `active` = ?, `product_category_id` = ?, " +
    " `price` = ?, `description` = ?, `discount_id` = ?, `unique_number` = ?, `delivery_matter` = ?, `barcode` = ? " +
    " WHERE `id` = ?"
    let queryParams = [
        params.name,
        params.featured === true? 1 : 0,
        params.active === true? 1 : 0,
        params.product_category_id ? params.product_category_id : null,
        params.price,
        params.description,
        params.discount_id ? params.discount_id : null,
        params.unique_number,
        params.delivery_matter === true? 1 : 0,
        params.barcode,
        params.id
    ]

    await execute({sql, params: queryParams})

    return await updateProductMedia(params.id, params.image) !== false;
}

const insertProduct = async (params: {
    name: string, 
    description: string | null,
    discount_id: number | null,
    price: string,
    featured: boolean | null, 
    active: boolean | null, 
    product_category_id: number | null, 
    unique_number: string | null,
    delivery_matter: boolean | null,
    barcode: string | null,
    image: {id: number, src_name: string, alt_text: string}[]}) =>{

    const sql = `INSERT INTO ??  (??, ??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`
    const queryParams = [
        _TB_NAME_PRODUCTS,
        'name',
        'featured',
        'product_category_id',
        'active',
        'description',
        'delivery_matter',
        'barcode',
        'unique_number',
        'price',
        'discount_id',
        params.name,
        params.featured === true? 1 : 0,
        params.product_category_id ? params.product_category_id : null,
        params.active === true? 1 : 0,
        params.description,
        params.delivery_matter === true? 1 : 0,
        params.barcode,
        params.unique_number,
        params.price,
        params?.discount_id ? params.discount_id : null,
    ]
    const lastInsertId = await execute({sql, params: queryParams, lastInsertId: true})

    //insert media
    if((lastInsertId !== null || true) && params.image?.length > 0){
        if(await updateProductMedia(+lastInsertId, params.image) === false) return false
    }
    return true
}

const getTogetherSingle_related = async (product_id: number) => {
    let single = await getSingleProductCustom(product_id, ProductEnumSingle.DETAIL)
    let related = await getAllProductsCustom(
        ProductEnumSingleArr.RELATED,
        {categoryId: single?.product_category_id || 0, productId: single.id}
    )

    return {single, related}
}

//assessment
const getAssessmentForProduct = async (id: number): Promise<{sum: number, num: number} | string> =>{
    const sql = "SELECT COUNT(`id`) as `num`, SUM(IFNULL(`assessment`, 0)) as `sum` FROM " + _TB_NAME_ASSESSMENT + " WHERE `product_id` = ?"
    const params = [id]

    const data = await execute({sql, params})

    if(data['num'] > 0) return { sum: data['sum'] / data['num'], num: data['num']} // TODO rename sum to avg
    return 'Nema ocene'
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
        case 'delete_cat_media':
            returnValue = await deleteCategoryMedia(params.cat_id, params.media_id)
            res.status(200)
            break
        case 'all_parent_categories_view':
            returnValue = await getAllParentCategoriesView()
            res.status(200)
            break
        case 'all_categories_menu':
            returnValue = await getAllCategoriesMenu()
            res.status(200)
            break
        case 'all_categories_with_img':
            returnValue = await getCategoriesWithImg()
            res.status(200)
            break
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
        case 'get_all_active_discounts':
            returnValue = await getAllActiveDiscounts()
            res.status(200)
            break
        //products
        case 'all_products':            
            returnValue = await getAllProducts()
            res.status(200)
            break;
        case 'all_product_discounts':
            returnValue = await getAllProductDiscounts()
            res.status(200)
            break
        case 'all_product_categories':
            returnValue = await getAllProductCategories()
            res.status(200)
            break
        case 'insert_product': 
            returnValue = await insertProduct(params)
            res.status(200)
            break;
        case 'update_product': 
            returnValue = await updateProduct(params)
            res.status(200)
            break;
        case 'delete_product': 
            returnValue = await deleteProduct(params.id)
            res.status(200)
            break;
        case 'single_product':
            returnValue = await getSingleProduct(params.id)
            res.status(200)
            break;
        case 'delete_prod_media':
            returnValue = await deleteProductMedia(params.prod_id, params.media_id)
            res.status(200)
        break
        case 'get_all_products_custom': 
            returnValue = await getAllProductsCustom(params.type, params)
            res.status(200)
            break
        case 'get_single_product_custom': 
            returnValue = await getSingleProductCustom(params.id, params.type)
            res.status(200)
            break
        case 'get_together_single_related':
            returnValue = await getTogetherSingle_related(params.id)
            res.status(200)
            break

        default:  res.status(404); break;
    }

    res.send(returnValue)
}
