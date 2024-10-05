import { Entity, Column, OneToMany, OneToOne, JoinColumn, ChildEntity } from 'typeorm';
import { User } from './user.entity';
import { Order } from '../../orders/entities/order.entity';
import { Cart } from '../../carts/entities/cart.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@ChildEntity()
export class Customer extends User {
    @Column('text')
    bilingAddress: string;

    @Column('text')
    shippingAddress: string;

    @Column('text')
    phone: string;

    @Column('text')
    country: string;

    @Column('text')
    city: string;

    @OneToMany(() => Order, order => order.customer)
    orders: Order[];

    @OneToOne(() => Cart, cart => cart.customer)
    @JoinColumn()
    cart: Cart;

    @OneToMany(() => Comment, comment => comment.customer)
    comments: Comment[];
}
