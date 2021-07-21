export interface ProductTbTr {
    id: number,
    main_image: string,
    name: string,
    category: string,
    price: string,
    gallery: number
    discount: string,
    active: number
}

export interface ProductSingle{
    id: number,
    name: string,
    main_image: {
        id: number,
        src_name: string,
        alt_text: string
    },
    description: string,
    featured: number,
    active: number,
    discount_id: number,
    product_category_id: number,
    price: string,
    barcode: string,
    delivery_matter: number,
    unique_number: string,
    images: {
        id: number,
        src_name: string,
        alt_text: string
    }[]
}
