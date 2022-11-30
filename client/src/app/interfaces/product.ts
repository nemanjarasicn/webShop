export interface ProductTbTr {
    id: number;
    main_image: string;
    name: string;
    category: string;
    price: string;
    gallery: number;
    discount: string;
    active: number;
    assessment: number;
}

export interface IProductImage {
  id: number;
  src_name: string;
  alt_text?: string;
}

export interface IProductOption {
  id: number;
  name: string;
  price?: number;
  selected?: boolean;
}

export interface ProductSingle{
    id: number;
    name: string;
    image?: IProductImage;
    description?: string;
    featured: number;
    active: number;
    discount_id?: number;
    discount?: number;
    product_category_id?: number;
    product_category_name?: string;
    price: string;
    new_price?: string;
    barcode?: string;
    delivery_matter?: number;
    unique_number?: string;
    assessment?: {
        num: number,
        sum: number
    };
    gallery?: IProductImage[];
    options?: IProductOption[];
}

export interface ProductAsideModal{
  id: number;
  new_price?: number;
  price: number;
  name: string;
  image?: IProductImage;
  discount: number;
  qty?: number;
}

export interface StorageProducts{
  productID: number;
  qty?: number;
  options?: IProductOption[];
}
