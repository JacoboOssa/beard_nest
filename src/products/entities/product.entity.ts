import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Image } from '../../images/entities/image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
    slug: string;

  @Column('text')
  name: string;

  @Column('decimal')
  price: number;

  @Column('text')
  description: string;

  @Column('int')
  stock: number;

  @Column('boolean')
  status: boolean;

  @ManyToOne(() => Category)
  category: Category;

  @OneToMany(() => Image, image => image.product)
  images: Image[];

}
