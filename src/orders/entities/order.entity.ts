import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Customer } from '../../users/entities/customer.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  amount: number;

  @Column('text')
  shipping_address: string;

  @Column('text')
  order_address: string;

  @Column('text')
  order_email: string;

  //Ver si se puede cambiar a un solo campo
  @Column()
  day: number;

  @Column()
  month: number;

  @Column()
  year: number;

  //Puede ser un enum para que sea mas facil de manejar
  @Column('text')
  order_status: string;

  @ManyToOne(() => Customer)
  customer: Customer;
}
