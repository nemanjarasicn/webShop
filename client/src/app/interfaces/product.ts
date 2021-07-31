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

export interface ProductSingle{
    id: number;
    name: string;
    image?: {
        id: number,
        src_name: string,
        alt_text?: string
    }[];
    description?: string;
    featured: number;
    active: number;
    discount_id?: number;
    discount?: number;
    product_category_id?: number;
    price: string;
    new_price?: string;
    barcode?: string;
    delivery_matter?: number;
    unique_number?: string;
    assessment?: {
        num: number,
        sum: number
    };
    gallery?: {
        id: number,
        src_name: string,
        alt_text?: string
    }[];
}

export interface ProductAsideModal{
  id: number;
  new_price?: number;
  price: number;
  name: string;
  image: string;
  alt_text?: string;
  discount: number;
  qty?: number;
}
