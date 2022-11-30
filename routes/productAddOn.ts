import { execute } from './db/mysql'

const _TB_NAME_ = "product_add_on_list"
const _TB_NAME_PRODUCTS = "product"

export const getAll = async (productId: number) => {
  const sql = `SELECT ??, ??, ??, CONCAT( ??, " rsd.") as ?? FROM ?? WHERE ?? = ?`
  const params = [
      'id',
      'name',
      'description',
      'price',
      'price',
      _TB_NAME_,
      'product_id',
      productId
  ]

  return await execute({sql, params})
}

const deleteItem = async (productAddOnId: number) => {
  const sql = `DELETE FROM ?? WHERE ?? = ?`
  const params = [
      _TB_NAME_,
      'id',
      productAddOnId
  ]

  await execute({sql, params})

  return true
}

const insert = async (params: {
  productId: number,
  name: string,
  description: string | null,
  price: number | null
}) => {
  const sql = `INSERT INTO ?? (??, ??, ??, ??) VALUES (?, ?, ?, ?)`
  const queryParams = [
      _TB_NAME_,
      'product_id',
      'name',
      'description',
      'price',
      params.productId,
      params.name,
      params.description,
      params.price
  ]

  await execute({sql, params: queryParams})

  return true
}

const getProducts = async () => {
  const sql = `SELECT ??, ?? as ?? FROM ??`
  const params = [
      'id',
      'name',
      'title',
      _TB_NAME_PRODUCTS
  ]

  return await execute({sql, params})
}

const update =  async (params: {
  id: number,
  productId: number,
  name: string,
  description: string | null,
  price: number | null
}) => {
  const sql = `UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? , ?? = ? WHERE ?? = ?`
  const queryParams = [
    _TB_NAME_,
    'product_id',
    params.productId,
    'name',
    params.name,
    'description',
    params.description,
    'price',
    params.price,
    'id',
    params.id
  ]

  await execute({sql, params: queryParams})

  return true
}

const single = async (id: number) => {
  const sql = `SELECT ??, ??, ??, ?? FROM ?? WHERE ?? = ?`
  const queryParams = [
    'id',
    'name',
    'description',
    'price',
    _TB_NAME_,
    'id',
    id
  ]
  return await execute({sql, params: queryParams, single: true})
}

export async function product_add_on_endpoint(req, res){
  const action: string = req.params.action
  const params = req.body

  let returnValue: any = undefined

  switch(action){
    case 'all':
      returnValue = await getAll(params.productId)
      res.status(200)
      break;
    case 'insert':
      returnValue = await insert(params)
      res.status(200)
      break;
    case 'delete':
      returnValue = await deleteItem(params.productAddOnId)
      res.status(200)
      break;
    case 'getProducts':
      returnValue = await getProducts()
      res.status(200)
      break;
    case 'update':
      returnValue = await update(params)
      res.status(200)
      break;
    case 'single':
      returnValue = await single(params.id)
      res.status(200)
      break;
    default: res.status(404); break;
  }

  res.send(returnValue)
}
