export interface Food {
  fid: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface CartItem extends Food{
  qty: number
}