export interface IProducts {
  products?: ProductsEntity[];
}
export interface ProductsEntity {
  id: string;
  name: string;
  description: string;
  price: number | string;
  brand: string;
  category: string;
  inStock: boolean;
  stock: number;
  attributes?: AttributesEntity[];
  reviews?: ReviewsEntity[];
  quantity?: number;
}
export interface AttributesEntity {
  color: string;
  colorCode: string;
  image: string;
}
export interface ReviewsEntity {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdDate: string | Date;
  user: User | any;
}
export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: null;
  image: string;
  hashedPassword?: null;
  createdAt: string;
  updatedAt: string;
  role: string;
}

export interface IProductParams {
  category: string | null;
  searchItem?: string | null;
}