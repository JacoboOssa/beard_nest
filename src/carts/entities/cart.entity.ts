import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { CartItem } from '../../cart_items/entities/cart_item.entity';
import { Customer } from '../../users/entities/customer.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => CartItem, cartItem => cartItem.cart)
  items: CartItem[];

  @OneToOne(() => Customer, customer => customer.cart)
  customer: Customer;
}
