export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  categorieId: string;
}

export interface Brand {
  id: number;
  name: string;
  products: Product[];
}
