import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Customer } from '../../users/entities/customer.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @Column('int')
  stars: number;

  @ManyToOne(() => Customer, customer => customer.comments)
  customer: Customer;

  @ManyToOne(() => Product)
  product: Product;
}
