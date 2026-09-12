export interface Wish {
  id: number;
  name: string;
  price: number;
  bought: boolean;
  priority: 'high' | 'low';
}
