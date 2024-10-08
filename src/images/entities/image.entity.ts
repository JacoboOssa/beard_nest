import { Category } from '../../categories/entities/category.entity';
import { Product } from '../../products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  url_img: string;

  @ManyToOne(() => Product, product => product.images)
  product: Product;
}
