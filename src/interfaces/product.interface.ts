export interface Product {
  _id: string;
  name: string;
  price: number;
  size: ISizes[];
  posters: IImage[];
  discount: number;
  category: string;
  note: string;
  totalQuantity: number;
}

export interface ISizes {
  size: number;
  quantity: number;
}

export interface IImage {
  public_id: string;
  url: string;
}

export interface Category {
  _id: string;
  name: string;
  key: string;
  logo: IImage;
  subCategory: SubCategory[];
}

export interface SubCategory {
  name: string;
  path: string;
}
