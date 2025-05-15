
export interface Color { id: string; colorName: string; }
export interface ProductType {
  id: string;
  productTypeName: string;
  material?: string;
  fitDetails?: string;
  care?: string;
  modelInfo?: string;
}

export interface MonthlyEvent {
  id: string;
  name: string;
  creationDate: string;
  endDate: string;

}
export interface Print { id: string; printName: string; }
