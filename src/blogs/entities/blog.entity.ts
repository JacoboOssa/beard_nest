import { Length, MaxLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn } from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  slug: string;

  @Column('text', {unique: true})
  title: string;

  @Column('text')
  @MaxLength(1)
  status: string;

  @Column('text')
  content: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @BeforeInsert()
    checkSlug(): void {
        if (!this.slug){
            this.slug = this.title;
        }
        this.slug = this.slug.toLowerCase().replace(/ /g, '-');
    }
}
