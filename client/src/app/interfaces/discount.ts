export interface Discount {
    id?: number,
    name: string,
    percentage_value: number,
    start_at?: string,
    end_at?: string,
    promo_code?: string
}
