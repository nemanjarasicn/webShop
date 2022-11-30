export interface Category {
    name: string;
    featured: 0 | 1;
    parent_cat?: number;
    image?: string;
}

export interface CategoryBasic{
    id: number;
    label: string;
    image: {
      id: number,
      src_name: string;
      alt_text?: string;
    };
}

export interface CategoryMenu{
    id: number;
    label: string;
    parent: boolean;
    featured: boolean;
    image: {
        id: number,
        src_name: string;
        alt_text?: string;
    };
    children?: CategoryMenu[];
}
