import { Image } from 'src/images/entities/image.entity';
import { Product } from 'src/products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    //La relacion deberia ir tambien con imagen (creo)
    @Column()
    image: string;

    @Column('text', { unique: true })
        slug: string;

    @OneToMany(() => Product, product => product.category)
    products: Product[];

    @OneToMany(() => Image, image => image.category)
    images: Image[];

}
