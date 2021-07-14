export interface Media {
    name: string,
    type_id: number,
    file: File,
    alt_text: string,
}

export interface MediaPick{
    id: number,
    src_name: string,
    alt_text: string,
    name: string
}

export interface MediaTrTd{
    id: number,
    name: string,
    src_name: string,
    image: string,
    alt_text: string, 
    type: string
}
