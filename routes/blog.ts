import { execute } from './db/mysql'
import {IBlogHomeLatestInsertUpdate} from "./Interfaces/blog.interface";
import {BlogCustomGet} from "./enums/blog-enum";

const _TB_NAME_ = "blog"
const _TB_NAME_BLOG_MEDIA = "blog_media"
const _TB_NAME_MEDIA = "media"

const getImageForBlog = async (id): Promise<{
  id:number,
  src_name: string,
  alt_text?:string
}> => {
  // take main_image
  let sql = `SELECT m.??, m.??, m.?? FROM ?? m INNER JOIN ?? bm ON bm.?? = m.?? WHERE bm.?? = ?`
  let queryParams = [
    'id',
    'src_name',
    'alt_text',
    _TB_NAME_MEDIA,
    _TB_NAME_BLOG_MEDIA,
    'media_id',
    'id',
    'blog_id',
    id
  ]

  const tmpImage = await execute({sql, params: queryParams, single: true}) as {id: number, src_name: string, alt_text: string}
  return {
    id: tmpImage?.id,
    src_name: tmpImage?.src_name,
    alt_text: tmpImage?.alt_text
  }
}


const getAll = async (custom?: {sql: string, params: Array<string | number | Date | number[] | string[]>}) =>{
  let completeResponse

  const sql = `SELECT DISTINCT b.??, b.??, b.??, b.??, DATE_FORMAT(b.??, "%d/%m/%Y") AS ?? FROM ?? b`
  const params = [
    'id',
    'title',
    'short_desc',
    'content',
    'published_date',
    'published_date',
    _TB_NAME_
  ]

  completeResponse =  await execute({sql: custom?.sql || sql , params: custom?.params || params})

  if(completeResponse?.length > 0){
    const tmp = completeResponse

    let i = 0
    for(let row of tmp){
      completeResponse[i++].image = await getImageForBlog(row.id)
    }
  }
  
  return completeResponse
}

const getSingle = async (id: number) => {
  let sql = `SELECT b.??, b.??, b.??, b.??, DATE_FORMAT(b.??, "%d/%m/%Y") AS ?? FROM ?? b
    WHERE b.?? = ?`
  let params = [
    'id',
    'title',
    'short_desc',
    'content',
    'published_date',
    'published_date',
    _TB_NAME_,
    'id',
    id
  ]

  let completeResponse = await execute({sql, params, single: true})

  completeResponse['image'] =  await getImageForBlog(id)

  return completeResponse
}

const deleteItem = async (id: number) => {
  const sql = `DELETE FROM ?? WHERE ?? = ?`
  let params = [_TB_NAME_BLOG_MEDIA, 'blog_id', id]
  await execute({sql, params})

  params = [_TB_NAME_, 'id', id]
  return await execute({sql, params})
}

const update = async (params: IBlogHomeLatestInsertUpdate) => {
  let sql = "UPDATE ??  SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?"
  let queryParams = [_TB_NAME_, `title`, params.title, `short_desc`,  params.short_desc, `content`, params.content, `id`, params.id]

  await execute({sql, params: queryParams})

  if(params?.image?.length > 0){
    sql = `INSERT INTO ?? (??, ??) VALUES (?, ?)`
    queryParams = [_TB_NAME_BLOG_MEDIA, 'media_id', 'blog_id', params.image[0].id.toString(), params.id]
  }

  return await execute({sql, params: queryParams})
}

const insert = async (params: IBlogHomeLatestInsertUpdate) => {
  let sql = `INSERT INTO ?? (??, ??, ??) VALUES ( ?, ?, ?)`
  let qParams = [_TB_NAME_, 'title', 'short_desc', 'content', params.title, params.short_desc, params.content]

  const lastID =  await execute({sql, params: qParams, lastInsertId: true}) as number

  if(params?.image?.length > 0){
    sql = `INSERT INTO ?? (??, ??) VALUES (?, ?)`
    qParams = [_TB_NAME_BLOG_MEDIA, 'media_id', 'blog_id', params.image[0].id.toString(), lastID.toString()]
  }

  return await execute({sql, params: qParams, lastInsertId: true})
}

const deleteMainImage = async (id: number, media_id) => {
  const sql = `DELETE FROM ?? WHERE ?? = ? AND ?? = ?`
  const params = [_TB_NAME_BLOG_MEDIA, 'media_id', media_id, 'blog_id', id]
  return await execute({sql, params})
}

const customGetAll = async (type: number, param?: { offset?: number, limit?: number, ids?: number[] }) => {
  let sql: string, params: Array<string | number | Date| number[] | string[]>
  switch (type){
    case BlogCustomGet.LATEST:
       sql = `SELECT DISTINCT m.?? as ??, m.?? as ??, b.??, b.??, b.??, b.??, 
        DATE_FORMAT(b.??, "%d") AS ??, Left(DATE_FORMAT(??, '%M', 'rs-RS'), 3) AS ?? FROM ?? b
        LEFT JOIN ?? bm ON bm.?? = b.?? LEFT JOIN ?? m ON m.?? = bm.?? ORDER BY b.?? DESC LIMIT ?`
       params = [
        'src_name',
        'main_img_src',
        'alt_text',
        'main_img_alt_text',
        'id',
        'title',
        'short_desc',
        'content',
        'published_date',
        'published_date_day',
         'published_date',
         'published_date_month_txt',
        _TB_NAME_,
        _TB_NAME_BLOG_MEDIA,
        'blog_id',
        'id',
        _TB_NAME_MEDIA,
        'id',
        'media_id',
        'published_date',
         8
      ]
      break;

    case BlogCustomGet.LIST:
      sql = `SELECT DISTINCT m.??, m.??, b.??, b.??, b.??, 
        DATE_FORMAT(b.??, "%d") AS ??, Left(DATE_FORMAT(??, '%M', 'rs-RS'), 3) AS ??, DATE_FORMAT(b.??, "%Y") AS ?? 
        FROM ?? b
        LEFT JOIN ?? bm ON bm.?? = b.?? LEFT JOIN ?? m ON m.?? = bm.?? ORDER BY b.?? DESC LIMIT ? OFFSET ?`
      params = [
        'src_name',
        'alt_text',
        'id',
        'title',
        'short_desc',
        'published_date',
        'published_date_day',
        'published_date',
        'published_date_month_txt',
        'published_date',
        'published_date_year',
        _TB_NAME_,
        _TB_NAME_BLOG_MEDIA,
        'blog_id',
        'id',
        _TB_NAME_MEDIA,
        'id',
        'media_id',
        'published_date',
        param.limit,
        param?.offset || 0
      ]
    break;

    case BlogCustomGet.RECENT:
      sql = `SELECT DISTINCT m.??, m.??, b.??, b.??, 
        DATE_FORMAT(b.??, "%d") AS ??, Left(DATE_FORMAT(??, '%M', 'rs-RS'), 3) AS ??, DATE_FORMAT(b.??, "%Y") AS ?? 
        FROM ?? b
        LEFT JOIN ?? bm ON bm.?? = b.?? LEFT JOIN ?? m ON m.?? = bm.??
        WHERE b.?? IN (?)
        ORDER BY b.?? DESC`
      params = [
        'src_name',
        'alt_text',
        'id',
        'title',
        'published_date',
        'published_date_day',
        'published_date',
        'published_date_month_txt',
        'published_date',
        'published_date_year',
        _TB_NAME_,
        _TB_NAME_BLOG_MEDIA,
        'blog_id',
        'id',
        _TB_NAME_MEDIA,
        'id',
        'media_id',
        'id',
        param?.ids || null,
        'published_date'
      ]
      break;
  }

  return await getAll({sql, params})
}

export async function blogs_endpoint(req, res){
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
    case 'deleteMainImage':
      returnValue = await deleteMainImage(params.id, params.media_id)
      res.status(200)
      break;
    case 'homeLatest':
      returnValue = await customGetAll(BlogCustomGet.LATEST)
      res.status(200)
      break;
    case 'blogsList':
      returnValue = await customGetAll(BlogCustomGet.LIST, params)
      res.status(200)
      break;
    case 'recentBlogs':
      returnValue = await customGetAll(BlogCustomGet.RECENT, params)
      res.status(200)
      break;

    default: res.status(404); break;
  }

  res.send(returnValue)
}
