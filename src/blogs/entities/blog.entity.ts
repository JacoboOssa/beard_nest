import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('boolean')
  status: boolean;

  @Column('text')
  content: string;

  @Column('date')
  date: Date;
}
