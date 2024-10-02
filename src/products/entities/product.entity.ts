import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, BeforeInsert } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Image } from '../../images/entities/image.entity';
import { MaxLength } from 'class-validator';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  slug: string;

  @Column('text', {unique: true})
  name: string;

  @Column('decimal')
  price: number;

  @Column('text')
  description: string;

  @Column('int')
  stock: number;

  @Column('text')
  @MaxLength(1)
  status: string;

  @ManyToOne(() => Category)
  category: Category;

  @OneToMany(() => Image, image => image.product)
  images: Image[];

  @BeforeInsert()
    checkSlug(): void {
        if (!this.slug){
            this.slug = this.name;
        }
        this.slug = this.slug.toLowerCase().replace(/ /g, '-');
    }


}
