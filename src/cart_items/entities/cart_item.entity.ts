import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Cart } from '../../carts/entities/cart.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  total: number;

  @Column('int')
  quantity: number;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Cart)
  cart: Cart;
}
