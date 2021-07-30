import { pool } from './db/mysql'

const _TB_NAME_PRODUCTS = "`product`"
const _TB_NAME_PRODUCTS_MEDIA = "`product_media`"
const _TB_NAME_CATEGORY = "`product_category`"
const _TB_NAME_CATEGORY_MEDIA = "`category_media`"
const _TB_NAME_MEDIA = "`media`"
const _TB_NAME_DISCOUNT = "`discount`"
const _TB_NAME_ASSESSMENT = "`product_assessment`"

//categories
const getAllParentCategories = () =>{
    return new Promise((res, rej)=>{
        const sql = "SELECT `id` as `value`, `name` as `label` FROM " + _TB_NAME_CATEGORY //+ " WHERE `parent_cat` IS NULL" 

        pool.query(sql, function (error, results) {
            if(error){
                console.log(error)
                return rej(false)
            } 
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
            if(error){
                console.log(error)
                return rej(false)
            } 
            res(JSON.parse(JSON.stringify(results || [])))
        });
    })
}

const getAllCategoriesMenu = () =>{
    return new Promise((res, rej)=>{
        const sql = "SELECT `c`.`id`, `c`.`name` as `label`, (`c`.`parent_cat` IS NOT NULL) AS parent, `c`.`featured`, `m`.`src_name` as `img_src`, `m`.`alt_text` " +
        " FROM " + _TB_NAME_CATEGORY  + "  `c` " +
        " LEFT JOIN " + _TB_NAME_CATEGORY_MEDIA + " `cm` ON `cm`.`category_id` = `c`.`id`" +
        " LEFT JOIN " + _TB_NAME_MEDIA + " `m` on `m`.`id` = `cm`.`media_id`" +
        " ORDER BY `c`.`parent_cat`, `c`.`featured` DESC"
        
        pool.query(sql, function (error, results, fields) {
            if(error){
                console.log(error)
                return rej(false)
            } 
            res(JSON.parse(JSON.stringify(results || [])))
        })
    })
}

const getAllParentCategoriesView = () =>{
    return new Promise((res, rej)=>{
        const sql = "SELECT `id`, `name` as `label` FROM " + _TB_NAME_CATEGORY + " WHERE `parent_cat` IS NULL ORDER BY `featured` DESC" 

        pool.query(sql, function (error, results, fields) {
            if(error){
                console.log(error)
                return rej(false)
            } 
            res(JSON.parse(JSON.stringify(results || [])))
        })
    })
}

const getCategoriesWithImg = () => {
    return new Promise((res, rej)=>{
        const sql = "SELECT `c`.`id`, `c`.`name` as `label`, `m`.`src_name` as `img_src`, `m`.`alt_text` FROM " + _TB_NAME_CATEGORY  + "  `c` " +
        " LEFT JOIN " + _TB_NAME_CATEGORY_MEDIA + " `cm` ON `cm`.`category_id` = `c`.`id`" +
        " LEFT JOIN " + _TB_NAME_MEDIA + " `m` on `m`.`id` = `cm`.`media_id`" +
        " WHERE `m`.`src_name` IS NOT NULL ORDER BY `c`.`parent_cat`, `c`.`featured` DESC LIMIT 12"
        
        pool.query(sql, function (error, results, fields) {
            if(error){
                console.log(error)
                return rej(false)
            } 
            res(JSON.parse(JSON.stringify(results || [])))
        })
    })
}


const getSingleCategory = (id: number) => {
    return new Promise((res, rej)=>{
        let completeResponse

        new Promise((resIN, rejIN)=>{
            const sql = "SELECT `c`.`name`, `c`.`featured`, `c`.`parent_cat` FROM " + _TB_NAME_CATEGORY  + "  `c`  WHERE `c`.`id` = ? " 
            const queryParams = [id]
    
            pool.query(sql, queryParams, function (error, results, fields) {
                if(error){
                    console.log(error)
                    return rej(false)
                } 
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

const deleteCategory = (id: number): Promise<boolean> => {
    return new Promise(async (res, rej)=>{
        let sql = "DELETE FROM " + _TB_NAME_CATEGORY_MEDIA + " WHERE `category_id` = ? "
        let queryParams = [id]
        await new Promise((resIN, rejIN)=>{
            pool.query(sql, queryParams, function (error, results, fields) {
                if(error) {
                    console.log(error)
                    return rej(false)
                }
                resIN(true)
            })
        });

        sql = "UPDATE " + _TB_NAME_CATEGORY + " SET `parent_cat` = NULL WHERE `id` = ? "
        queryParams = [id]
        await new Promise((resIN, rejIN)=>{
            pool.query(sql, queryParams, function (error, results, fields) {
                if(error) {
                    console.log(error)
                    return rej(false)
                }
                resIN(true)
            })
        })

        sql = "UPDATE " + _TB_NAME_PRODUCTS + " SET `product_category_id` = NULL WHERE `product_category_id` = ? "
        queryParams = [id]
        await new Promise((resIN, rejIN)=>{
            pool.query(sql, queryParams, function (error, results, fields) {
                if(error) {
                    console.log(error)
                    return rej(false)
                }
                resIN(true)
            })
        })

        sql = "DELETE FROM " + _TB_NAME_CATEGORY + " WHERE `id` = ? "
        queryParams = [id]
        await new Promise((resIN, rejIN)=>{
            pool.query(sql, queryParams, function (error, results, fields) {
                if(error) {
                    console.log(error)
                    return rej(false)
                }
                resIN(true)
            })
        })

        res(true)
    })
}

const deleteCategoryMedia = (cat_id: number, media_id: number): Promise<boolean>=>{
    return new Promise(async (res, rej) => {
        const sql = "DELETE FROM " + _TB_NAME_CATEGORY_MEDIA + " WHERE `category_id` = ? AND `media_id` = ?"
            const queryParams = [cat_id, media_id]

            await pool.query(sql, queryParams, function (error, results, fields) {
                if(error) return rej(false)            
                res(true)
            });    
    })
}

const updateCategoryMedia = (cat_id: number, image: {id: number, src_name: string, alt_text?: string}[]): Promise<boolean> =>{
    return new Promise(async (res, rej)=>{
        if(image === null || image?.length < 1) return res(true)
        
        let i = 0
        for(let img of image){
            let sql = "INSERT INTO " + _TB_NAME_CATEGORY_MEDIA + " (`category_id`, `media_id`"
            let queryParams = [cat_id, img.id]

            if(i === 0){
                sql += ", `main`) VALUES (?, ?, ?)"
                queryParams.push(1)
            }else sql += ") VALUES (?, ?)"


            await new Promise((resIN, rejIN)=>{
                pool.query(sql, queryParams, function (error, results, fields) {
                    if(error) return rej(false)
                    resIN(true)            
                });    
            }) 

            i++
        }

        res(true)
    })
}

const updateCategory = (params: {name: string, featured: boolean | null, parent_cat: number | null, id: number, image: {id: number, src_name: string, alt_text?: string}[]}) =>{
    return new Promise(async(res, rej)=>{        
        const sql = "UPDATE " + _TB_NAME_CATEGORY + "  SET `name` = ?, `featured` = ? , `parent_cat` = ? WHERE `id` = ?"
        const queryParams = [params.name, params.featured === true? 1 : 0, params.parent_cat ? params.parent_cat: null, params.id]

        await new Promise((resIN, rejIN)=>{
            pool.query(sql, queryParams, function (error, results, fields) {
                if(error) return rej(false)
                resIN(true)            
            });
        })

        if(await updateCategoryMedia(params.id, params.image) === false) return rej(false)

        res(true)
    })
}

const insertCategory = (params: {name: string, featured: boolean | null, parent_cat: number | null, image: {id: number, src_name: string, alt_text: string}[]}) =>{
    return new Promise((res, rej)=>{
        new Promise((resIN, rejIN)=>{
            const sql = "INSERT INTO " + _TB_NAME_CATEGORY + " (`name`, `featured`, `parent_cat`) VALUES ( ?, ?, ? )"
            const queryParams = [params.name, params.featured === true? 1 : 0, params.parent_cat ? params.parent_cat: null]
            pool.query(sql, queryParams, function (error, results, fields) {
                if(error) return rej(false)
                resIN(results.insertId)
            });
        }).then(async (result)=>{
            //insert media
            if((result !== null || true) && params.image?.length > 0){
                if(await updateCategoryMedia(+result, params.image) === false) return rej(false)
            }

            res(true)
        })
    })
}

//discounts
const getAllDiscounts = () =>{
    return new Promise((res, rej)=>{
        const sql = "SELECT * FROM " + _TB_NAME_DISCOUNT
        
        pool.query(sql, function (error, results, fields) {
            if(error) rej(false)
            else res(JSON.parse(JSON.stringify(results || [])))
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
            else res(JSON.parse(JSON.stringify(results[0] || null)))
        });
    })
}

const deleteDiscount = (id: number) => {
    return new Promise(async (res, rej)=>{
        let sql = "UPDATE " + _TB_NAME_PRODUCTS + " SET `discount_id` = NULL WHERE `discount_id` = ?"
        let queryParams = [id]
        await new Promise((resIN, rejIN)=>{
            pool.query(sql, queryParams, function (error, results, fields) {
                if(error) return rej(false)
                resIN(true)
            })
        })
        
        sql = "DELETE FROM " + _TB_NAME_DISCOUNT + " WHERE `id` = ? "
        queryParams = [id]
        pool.query(sql, queryParams, function (error, results, fields) {
            if(error) return rej(false)
            res(true)
        })
    })
}

const updateDiscount = (params: {name: string, percentage_value: number, start_at: string | null, end_at: string | null, promo_code: string | null, id: number}) =>{
    return new Promise((res, rej)=>{
        const sql = "UPDATE " + _TB_NAME_DISCOUNT + "  SET `name` = ?, `percentage_value` = ? , `start_at` = ?, `end_at` = ?, `promo_code` = ? WHERE `id` = ?"
        const queryParams = [params.name, params.percentage_value, params.start_at, params.end_at, params.promo_code, params.id]

        pool.query(sql, queryParams, function (error, results, fields) {
            if(error) return rej(false)
            res(true)
        })
    })
}

const insertDiscount = (params: {name: string, percentage_value: string, start_at: string | null, end_at: string | null, promo_code: string | null}) =>{
    return new Promise((res, rej)=>{
        const sql = "INSERT INTO " + _TB_NAME_DISCOUNT + " (`name`, `percentage_value`, `start_at`, `end_at`, `promo_code`) VALUES ( ?, ?, ?, ?, ? )"
        const queryParams = [params.name, +params.percentage_value, params.start_at, params.end_at, params.promo_code]

        pool.query(sql, queryParams, function (error, results, fields) {
            if(error){
                console.log(error)
                return rej(false)
           } 
            res(true)
        })
    })
}

const getAllActiveDiscounts = () =>{
    return new Promise((res, rej)=>{
        const sql = "SELECT `id`, `name`, `percentage_value`,DATE_FORMAT(`start_at`, \"%d %m %Y\") AS `start_at`, DATE_FORMAT(`end_at`, \"%d %m %Y\") AS `end_at`, `promo_code` FROM " +
         _TB_NAME_DISCOUNT + " WHERE (`start_at` IS NULL AND `end_at` IS NULL) OR (NOW() BETWEEN `start_at` AND `end_at`) AND `promo_code` IS NOT NULL " 

        pool.query(sql, function (error, results, fields) {
            if(error){
                console.log(error)
                return rej(false)
           } 
            res(JSON.parse(JSON.stringify(results)))
        })
    })
}

//products
const getAllProducts = (custom? :{customSql: string, customParams: any[]}) =>{
    return new Promise(async (res, rej)=>{
        let completeResponse

        let sql = "SELECT `p`.`id`, `m`.`src_name` as `image`, `p`.`name`, `c`.`name` as `category`, `p`.`price`, " +
        " CONCAT( IFNULL(`d`.`name`, \"Nema popusta\"), \"( \", IFNULL(`d`.`percentage_value`, \" \"), \" % )\" ) as `discount`, " +
        " ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price`, `p`.`active` FROM " + _TB_NAME_PRODUCTS + " `p`" +
        " LEFT JOIN " + _TB_NAME_CATEGORY + " `c` ON `c`.`id` = `p`.`product_category_id`" +
        " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` " +
        " LEFT JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`product_id` = `p`.`id` AND `pm`.`main` = ? " +
        " LEFT JOIN " + _TB_NAME_MEDIA + " `m` ON `m`.`id` = `pm`.`media_id` "
        let queryParams = [1]

        await new Promise((resIN, rejIN)=>{
            pool.query(custom?.customSql || sql, custom?.customParams || queryParams, function (error, results, fields) {
               if(error){
                    console.log(error)
                    return rej(false)
               } 
   
               completeResponse = JSON.parse(JSON.stringify(results))
               resIN(true)
           })
        })

        if(completeResponse?.length > 0){
            const tmp = completeResponse

            let i = 0
            for(let row of tmp){
                //set assessment
                completeResponse[i].assesssment = await getAssessmentForProduct(row['id'])

                //set gallery
                sql = "SELECT `m`.`src_name` FROM " + _TB_NAME_MEDIA + " `m` "+
                " INNER JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`media_id` = `m`.`id` " +
                " WHERE `pm`.`product_id` = ? ORDER BY `pm`.`main` DESC"                
                queryParams = [row['id']]
    
                await new Promise((resIN, rejIN)=>{
                    pool.query(sql, queryParams, function (error, results, fields) {
                        if(error) return rej(false)
                        
                        completeResponse[i].gallery = results
                        resIN(true)
                    })
                })
    
                i++
            }
        }

        res(completeResponse)
    })
}

const getAllProductCategories = () => {
    return new Promise((res, rej)=>{
        const sql = "SELECT `id` as 'value', `name` as 'label' FROM " + _TB_NAME_CATEGORY
        
        pool.query(sql, function (error, results, fields) {
            if(error) rej(false)
            else res(JSON.parse(JSON.stringify(results || [])))
        });
    })
}

const getAllProductDiscounts = () => {
    return new Promise((res, rej)=>{
        const sql = "SELECT `id` as 'value', `name` as 'label' FROM " + _TB_NAME_DISCOUNT
        
        pool.query(sql, function (error, results, fields) {
            if(error){
                console.log(error)
                return rej(false)
            } 
            res(JSON.parse(JSON.stringify(results || [])))
        });
    })
}

const getSingleProduct = (id: number, custom? :{customSql: string, customParams: any[]}) => {
    return new Promise((res, rej)=>{
        let completeResponse

        //take all info from `product` table
        new Promise((resIN, rejIN)=>{
            const sql = "SELECT * FROM " + _TB_NAME_PRODUCTS + " WHERE `id` = ?"
            const queryParams = [id]
    
            pool.query(custom?.customSql || sql, custom?.customParams || queryParams, function (error, results, fields) {
                if(error){
                    console.log(error)
                    return rej(false)
                } 
                completeResponse = JSON.parse(JSON.stringify(results[0] || null))

                resIN(true)
            });
        })
        .then(result => {
            //take main_image
            const sql = "SELECT `m`.`id`, `m`.`src_name`, `m`.`alt_text` FROM " + _TB_NAME_MEDIA + " `m` " +
            " INNER JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`media_id` = `m`.`id` " +
            " WHERE `pm`.`product_id` = ? AND `pm`.`main` = ?"
            const queryParams = [id, 1]

            pool.query(sql, queryParams, function (error, results, fields) {
                if(error){
                    console.log(error)
                    return rej(false)
                } 
                
                completeResponse.image = results
            })
        })
        .then(result => {
            //take images (gallery)
            const sql = "SELECT `m`.`id`, `m`.`src_name`, `m`.`alt_text` FROM " + _TB_NAME_MEDIA + " `m` " +
            " INNER JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`media_id` = `m`.`id` " +
            " WHERE `pm`.`product_id` = ? AND `pm`.`main` IS NULL"
            const queryParams = [id]

            pool.query(sql, queryParams, function (error, results, fields) {
                if(error){
                    console.log(error)
                    return rej(false)
                } 
                
                completeResponse.gallery = results
                res(completeResponse)
            });
        })
    })
}

const deleteProduct = (id: number): Promise<boolean> => {
    return new Promise(async (res, rej)=>{
        let sql = "DELETE FROM " + _TB_NAME_PRODUCTS_MEDIA + " WHERE `product_id` = ? "
        let queryParams = [id]
        await new Promise((resIN, rejIN)=>{
            pool.query(sql, queryParams, function (error, results, fields) {
                if(error){
                    console.log(error)
                    return rej(false)
                } 
                resIN(true)
            })
        })
        
        sql = "DELETE FROM " + _TB_NAME_PRODUCTS + " WHERE `id` = ? "
        queryParams = [id]        
        await new Promise((resIN,rejIN)=>{
            pool.query(sql, queryParams, function (error, results, fields) {
                if(error){
                    console.log(error)
                    return rej(false)
                }      
                resIN(true)
            });
        })

        res(true)
    })
}

const deleteProductMedia = (prod_id: number, media_id: number): Promise<boolean>=>{
    return new Promise((res, rej) => {
        const sql = "DELETE FROM " + _TB_NAME_PRODUCTS_MEDIA + " WHERE `product_id` = ? AND `media_id` = ?"
        const queryParams = [prod_id, media_id]

        pool.query(sql, queryParams, function (error, results, fields) {
            if(error) return rej(false)            
            res(true)
        });    
    })
}

const updateProductMedia = (prod_id: number, image: {id: number, src_name: string, alt_text?: string}[]): Promise<boolean> =>{
    return new Promise(async (res, rej)=>{
        if( image === null || image?.length < 1 ) return res(true)

        let i = 0
        for(let img of image){
            let sql = "INSERT INTO " + _TB_NAME_PRODUCTS_MEDIA + " (`product_id`, `media_id`"
            let queryParams = [prod_id, img.id]

            if(i === 0){
                sql += ", `main`) VALUES (?, ?, ?)"
                queryParams.push(1)
            }else sql += ") VALUES (?, ?)"


            await new Promise((resIN, rejIN)=>{
                pool.query(sql, queryParams, function (error, results, fields) {
                    if(error) return rej(false)            
                    resIN(true)
                })
            }) 

            i++
        }

        res(true)
    })
}

const getAllProductsCustom = (type: number, ids?: number[]) =>{
    return new Promise(async (res, rej) => {
        /* TYPES
         * 0: BEST ASSESSMENT
         * 1: WISHLIST, CART
         */
        const limit = 15
        const allTypes = [
            {
                customSql: "SELECT `p`.`id`, `m`.`src_name` as `image`, `p`.`name`, `p`.`price`, " +
                " `d`.`percentage_value` as `discount`, ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price` FROM " + _TB_NAME_PRODUCTS + " `p`" +
                " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` " +
                " LEFT JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`product_id` = `p`.`id` AND `pm`.`main` = ? " +
                " LEFT JOIN " + _TB_NAME_MEDIA + " `m` ON `m`.`id` = `pm`.`media_id` " +
                " WHERE `p`.`active` = ? LIMIT ?",

                customParams: [1, 1, limit]
            },
            {
                customSql: "SELECT `p`.`id`, `m`.`src_name` as `image`, `m`.`alt_text`, `p`.`name`, `p`.`price`, " +
                " `d`.`percentage_value` as `discount`, ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price` FROM " + _TB_NAME_PRODUCTS + " `p`" +
                " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` " +
                " LEFT JOIN " + _TB_NAME_PRODUCTS_MEDIA + " `pm` ON `pm`.`product_id` = `p`.`id` AND `pm`.`main` = ? " +
                " LEFT JOIN " + _TB_NAME_MEDIA + " `m` ON `m`.`id` = `pm`.`media_id` " +
                " WHERE `p`.`id` IN (?)",

                customParams: [1, ids?.length < 1? null: ids]
            }
        ]
        
        const products = await getAllProducts(allTypes[type])        
        res(products)
    })
}

const getSingleProductCustom = (product_id: number, type: number) =>{
    return new Promise(async (res, rej) => {
        /* TYPES
         * 0: BASIC
         */
        const allTypes = [{
            customSql: "SELECT `p`.`id`, `p`.`name`, `p`.`price`, `p`.`description`, `c`.`name` as `category`, " +
            " `d`.`percentage_value` as `discount`, ROUND((`p`.`price` * ((100 - IFNULL(`d`.`percentage_value`, 0)) / 100)), 2) as `new_price` FROM " + _TB_NAME_PRODUCTS + " `p`" +
            " LEFT JOIN " + _TB_NAME_CATEGORY + " `c` on `c`.`id` = `p`.`product_category_id` " +
            " LEFT JOIN " + _TB_NAME_DISCOUNT + " `d` on `d`.`id` = `p`.`discount_id` " +
            " WHERE `p`.`id` = ?",

            customParams: [product_id]
        }]
        
        const products: any = await getSingleProduct(product_id, allTypes[type])
        products.assesssment = await getAssessmentForProduct(product_id)
        res(products)
    })
}

const updateProduct = (params: {
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
    return new Promise(async (res, rej)=>{        
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

        await new Promise((resIN, rejIN)=>{
            pool.query(sql, queryParams, function (error, results, fields) {
                if(error) return rej(false)
                resIN(true)            
            })
        })

        if(await updateProductMedia(params.id, params.image) === false) return rej(false)

        res(true)
    })
}

const insertProduct = (params: {
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
    return new Promise((res, rej)=>{
        new Promise((resIN, rejIN)=>{
            const sql = "INSERT INTO " + _TB_NAME_PRODUCTS + " (`name`, `featured`, `product_category_id`, `active`, `description`, `delivery_matter`, `barcode`, `unique_number`, `price`, `discount_id`) VALUES " + 
            " ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )"
            const queryParams = [
                params.name, 
                params.featured === true? 1 : 0, 
                params.product_category_id ? params.product_category_id : null,
                params.active === true? 1 : 0, 
                params.description,
                params.delivery_matter === true? 1 : 0,
                params.barcode,    
                params.unique_number,
                params.price,
                params.discount_id ? params.discount_id : null,
            ]
            pool.query(sql, queryParams, function (error, results, fields) {
                if(error){
                    console.log(error)
                    return rej(false)
                } 
                resIN(results.insertId)
            });
        }).then(async (result)=>{
            //insert media
            if((result !== null || true) && params.image?.length > 0){
                if(await updateProductMedia(+result, params.image) === false) return rej(false)                
            }

            res(true)
        })
    })
}

//assessment
const getAssessmentForProduct = (id: number): Promise<number | string> =>{
    return new Promise(async (res, rej)=>{
        const query = "SELECT COUNT(`id`) as `num`, SUM(IFNULL(`assessment`, 0)) as `sum` FROM " + _TB_NAME_ASSESSMENT + " WHERE `product_id` = ?"
        const queryParams = [id]

        const data = await new Promise((resIN, rejIN) => {
            pool.query(query, queryParams, function (error, results, fields) {
                if(error){
                    console.log(error)
                    return rej(false)
                } 

                resIN(JSON.parse(JSON.stringify(results))[0])
            });
        })
        
        if(data['num'] > 0)return res(data['sum'] / data['num'])        
        res('Nema ocene')
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
            returnValue = await getAllProductsCustom(params.type, params?.ids)
            res.status(200)
            break
        case 'get_single_product_custom': 
            returnValue = await getSingleProductCustom(params.id, params.type)
            res.status(200)
            break
        default:  res.status(404); break;
    }

    res.send(returnValue)
}