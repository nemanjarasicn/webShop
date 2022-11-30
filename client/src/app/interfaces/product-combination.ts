import {ProductSingle} from './product';
import {PickMedia} from './pick-media';

export interface ProductCombinationItem {
  id?: number;
  product: ProductSingle;
  count: number;
}

export interface ProductCombinationTbTr {
  id?: number;
  image?: string;
  name: string;
  price: number;
  active: number;
  description?: string;
}

export interface ProductCombinationSingle{
  productCombination: ProductCombinationTbTr;
}

export interface ProductCombinationSingleDisplay extends ProductCombinationSingle{
  items: ProductCombinationItem[];
  media?: PickMedia;
}

export interface ProductCombinationSingleInsertUpdate extends ProductCombinationSingle{
  items: ProductCombinationItemInsertUpdate[];
  media_id: number;
}

export interface ProductCombinationItemInsertUpdate{
  id?: number;
  product_id: number;
  product_combinations_id?: number;
  count: number;
}
