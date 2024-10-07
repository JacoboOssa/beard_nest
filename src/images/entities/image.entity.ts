import { Category } from '../../categories/entities/category.entity';
import { Product } from '../../products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  url_img: string;

  @Column('text')
  imageId: string;

  //Tal vez deberia ser string
  @ManyToOne(() => Product, product => product.images)
  product: Product;
}
