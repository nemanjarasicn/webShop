import { execute } from './db/mysql'
import {IProductCombination, IProductCombinationsItem} from "./Interfaces/product-combinations.interface";
import {getSingleProduct} from "./products";

const _TB_NAME_COMBINATION = 'product_combination'
const _TB_NAME_COMBINATION_ITEM = 'product_combination_item'
const _TB_NAME_MEDIA_COMBINATION = 'product_combination_media'
const _TB_NAME_MEDIA = 'media'

const getAll = async () => {
  const sql = `SELECT DISTINCT c.??, m.?? as ??, c.??, CONCAT(c.??, ' rsd.') as ??, c.??, c.?? FROM ?? c 
    LEFT JOIN ?? cm ON cm.?? = c.??
    LEFT JOIN ?? m on m.?? = cm.??`

  const params = [
    'id',
    'src_name',
    'image',
    'name',
    'price',
    'price',
    'active',
    'description',
    _TB_NAME_COMBINATION,
    _TB_NAME_MEDIA_COMBINATION,
    'product_combination_id',
    'id',
    _TB_NAME_MEDIA,
    'id',
    'media_id'
  ]

  return await execute({sql, params})
}

const deleteCombination = async (id: number) => {
  const sql = `DELETE FROM ?? WHERE ?? = ?`

  let params = [
    _TB_NAME_COMBINATION_ITEM,
    'product_combination_id',
    id
  ]
  await execute({sql, params})

  params = [
    _TB_NAME_MEDIA_COMBINATION,
    'product_combination_id',
    id
  ]
  await execute({sql, params})

  params = [
      _TB_NAME_COMBINATION,
      'id',
      id
  ]
  await execute({sql, params})

  return true
}

const insert = async (params: {
  productCombination: IProductCombination,
  items: IProductCombinationsItem[],
  media_id: number
}) => {

  let sql = `INSERT INTO ?? (??, ??, ??, ??) VALUES (?, ?, ?, ?)`
  let queryParams = [
      _TB_NAME_COMBINATION,
    'name',
    'price',
    'active',
    'description',
    params.productCombination.name,
    params.productCombination.price,
    params.productCombination.active,
    params.productCombination.description
  ]
  const productCombinationId = await execute({sql, params: queryParams, lastInsertId: true}) as number

  if(params?.media_id){
    sql = `INSERT INTO ?? (??, ??) VALUES (?, ?)`
    queryParams = [
      _TB_NAME_MEDIA_COMBINATION,
      'media_id',
      'product_combination_id',
      params.media_id,
      productCombinationId
    ]
    await execute({sql, params: queryParams})
  }

  for(let item of params.items){
    await insertItem(item, productCombinationId)
  }

  return true
}

const update = async (params: {
  productCombination: IProductCombination,
  items?: IProductCombinationsItem[],
  media_id?: number
}) => {
  let sql = `UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`
  let queryParams = [
      _TB_NAME_COMBINATION,
      'name',
      params.productCombination.name,
      'price',
      params.productCombination.price,
      'description',
      params.productCombination.description,
      'active',
      params.productCombination.active,
      'id',
      params.productCombination.id
  ]

  await execute({sql, params: queryParams})

  if(params?.items?.length > 0){
    for(let item of params.items){
      await insertItem(item, params.productCombination.id)
    }
  }

  sql = `INSERT INTO ?? (??, ??) VALUES (?, ?)`
  queryParams = [
      _TB_NAME_MEDIA_COMBINATION,
      'product_combination_id',
      'media_id',
      params.productCombination.id,
      params.media_id
  ]
  await execute({sql, params: queryParams})

  return true
}

const insertItem = async (item: IProductCombinationsItem, productCombinationId: number) => {
  const sql = `INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)`
  const queryParams = [
    _TB_NAME_COMBINATION_ITEM,
    'product_id',
    'product_combination_id',
    'count',
    item.product_id,
    productCombinationId,
    item.count
  ]

  await execute({sql, params: queryParams})
}

const getSingle = async (id: number) => {
  let sql = `SELECT c.??,  m.?? as ??, m.?? as ??, m.?? as ??, c.??, c.??, c.??, c.?? FROM ?? c 
    LEFT JOIN ?? cm ON cm.?? = c.??
    LEFT JOIN ?? m on m.?? = cm.?? WHERE c.?? = ?`
  let params = [
    'id',
    'src_name',
    'image',
    'alt_text',
    'image_alt_text',
    'id',
    'media_id',
    'name',
    'price',
    'active',
    'description',
    _TB_NAME_COMBINATION,
    _TB_NAME_MEDIA_COMBINATION,
    'product_combination_id',
    'id',
    _TB_NAME_MEDIA,
    'id',
    'media_id',
    'id',
    id
  ]
  const productCombination = await execute({sql, params, single: true}) as IProductCombination

  sql = `SELECT ??, ??, ??, ?? FROM ?? WHERE ?? = ?`
  params = [
      'id',
      'product_combination_id',
      'product_id',
      'count',
      _TB_NAME_COMBINATION_ITEM,
      'product_combination_id',
      id
  ]
  const itemsTmp = await execute({sql, params}) as IProductCombinationsItem[]
  const items = []
  for (let item of itemsTmp){
    const tmpProductSingle = await getSingleProduct(item.product_id)
    items.push({product: tmpProductSingle, count: item.count, id: item.id, product_combination_id: item.product_combination_id})
  }

  return {productCombination, items, media: {id: productCombination.media_id, alt_text: productCombination.image_alt_text, src_name: productCombination.image}}
}

const deleteItem = async (id: number) => {
  const sql = `DELETE FROM ?? WHERE ?? = ?`
  const params = [
      _TB_NAME_COMBINATION_ITEM,
      'id',
      id
  ]

  await execute({sql, params})

  return true
}

const deleteMedia = async (id: number) => {
  const sql = `DELETE FROM ?? WHERE ?? = ?`
  const params = [
    _TB_NAME_MEDIA_COMBINATION,
    'media_id',
    id
  ]

  await execute({sql, params})

  return true
}

export async function product_combinations(req, res){
  const action: string = req.params.action
  const params: any = req.body
  let returnValue: any = undefined

  switch(action){
    case 'getAll':
      returnValue = await getAll()
      res.status(200)
      break;
    case 'getSingle':
      returnValue = await getSingle(params.id)
      res.status(200)
      break
    case 'delete':
      returnValue = await deleteCombination(params.id)
      res.status(200)
      break
    case 'deleteItem':
      returnValue = await deleteItem(params.id)
      res.status(200)
      break
    case 'deleteImage':
      returnValue = await deleteMedia(params.id)
      res.status(200)
      break
    case 'update':
      returnValue = await update(params)
      res.status(200)
      break
    case 'insert':
      returnValue = await insert(params)
      res.status(200)
      break

    default:  res.status(404); break;
  }

  res.send(returnValue)
}
