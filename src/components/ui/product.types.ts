export interface Product {
  // Optional grouping for event-based collections
  group?: string;
  // When `group` is present, `groupItems` holds the full list of products in that group
  groupItems?: Product[];
  id: string;
  name: string;
  image: string;
  artist: string;
  price: number;
  category: string;
  stock: number;
  isActive: boolean;
}
