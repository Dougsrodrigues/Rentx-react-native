export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  period: string;
  price: number;
  fuel_type: string;
  thumbnail: string;
  accessories?: AccessoriesEntity[] | null;
  photos?: PhotosEntity[] | null;
}

export interface AccessoriesEntity {
  id: string;
  type: string;
  name: string;
}

export interface PhotosEntity {
  id: string;
  photo: string;
}
