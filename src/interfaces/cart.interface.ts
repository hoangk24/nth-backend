export interface Cart {
  idUser: string;
  products: any;
  status: CartStatus;
  totalCost: number;
  totalSellingAmount: number;
  deliveryAmount: number;
  address: string;
  phoneNumber: string;
  fullName: string;
}

export enum CartStatus {
  'Cancle' = 0,
  'WaitingForAprove' = 1,
  'ShopZipping' = 2,
  'Delivering' = 3,
  'Done' = 4,
}
export interface ICartTemp {
  _id?: string;
  idUser: string;
  products: ICartItem[];
  totalQuantity?: number;
  totalCost?: number;
}

export interface ICartItem {
  idProduct: string;
  quantity: number;
  discount: number;
  note: string;
}
