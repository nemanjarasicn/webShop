export interface Category {
    name: string,
    featured: 0 | 1,
    parent_cat?: number,
    image?: string
}

export interface CategoryBasic{
    id: number,
    label: string,
    img_src?: string,
    alt_text?: string,
}

export interface CategoryMenu{
    id: number,
    label: string,
    parent: boolean,
    featured: boolean,
    img_src?: string,
    alt_txt?: string,
    children?: CategoryMenu[]
}