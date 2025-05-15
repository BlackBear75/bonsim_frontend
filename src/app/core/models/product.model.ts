export interface Product {
  id : string;
  name: string;
  price: number;
  productType: string;
  print: string;
  color: string;
  createdAt: string;
  images: string[];
  material?: string;
  fitDetails?: string;
  care?: string;
  modelInfo?: string;
}
