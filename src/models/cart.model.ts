export interface Cart {
  items: Array<CartItem>
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  product: string;
  quantity: number;
}