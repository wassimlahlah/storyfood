export type MenuType = {
  id: string;
  slug: string;
  title: string;
  desc?: string;
  img?: string;
  color: string;
}[];

export type ProductType = {
  id: string;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  option?: { title: string; additionalPrice: number }[];
};

export type OrderType = {
  id: string;
  phone:number;
  name:string;
  city:string;
  price: number;
  products: CartItemType[];
  status: string;
  createdAt: Date;
  intent_id?: string;
};

export type CartItemType = {
  id: string;
  title: string;
  img?: string;
  price: number;
  optionTitle?: string;
  quantity: number;
};

export type CartType = {
  products: CartItemType[];
  totalItems: number;
  totalPrice: number;
};

export type ActionTypes = {
  addToCart: (item: CartItemType) => void;
  removeFromCart: (item: CartItemType) => void;
  clearCart: () => void;
};
