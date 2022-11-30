export interface ProductAddOnTrTd {
  id: number;
  title: string;
  description?: string;
  price?: number;
}

export interface ProductAddOnInsert {
  productId: number;
  name: string;
  description: string | null;
  price: number | null;
}
