export interface ProductData {
  name: string;
  image: string;
  artist: string;
  price: number;
  category: string;
  stock: number;
  isActive: boolean;
}

export interface Product extends ProductData {
  id: string;
  group?: string;
  groupItems?: Product[];
}

export interface ProductItemBlock {
  type: 'item';
  item: ProductData;
}

export interface ProductGroupBlock {
  type: 'group';
  name: string;
  items: ProductData[];
}

export type ProductBlock = ProductItemBlock | ProductGroupBlock;
