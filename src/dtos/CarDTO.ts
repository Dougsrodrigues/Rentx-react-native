export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  rent: Rent;
  fuel_type: string;
  thumbnail: string;
  accessories?: AccessoriesEntity[] | null;
  photos?: string[] | null;
}
export interface Rent {
  period: string;
  price: number;
}
export interface AccessoriesEntity {
  type: string;
  name: string;
}
