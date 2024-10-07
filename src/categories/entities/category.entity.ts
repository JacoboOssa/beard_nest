import { Product } from '../../products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {unique: true})
    name: string;

    @Column()
    url_image:string;

    @Column('text', { unique: true })
    slug: string;

    @OneToMany(() => Product, product => product.category)
    products: Product[];

    @BeforeInsert()
    checkSlug(): void {
        if (!this.slug){
            this.slug = this.name;
        }
        this.slug = this.slug.toLowerCase().replace(/ /g, '-');
    }

}
