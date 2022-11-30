export interface IProductCombination{
  id?: number
  name: string
  price: number
  active: number
  description?: string
  image?: string,
  media_id?: number
  image_alt_text?: string
}

export interface IProductCombinationsItem{
  id?: number
  product_id: number
  product_combination_id?: number
  count: number
}
