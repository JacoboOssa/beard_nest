import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
