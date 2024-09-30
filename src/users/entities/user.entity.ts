import { BeforeInsert, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    lastname: string;

    @Column('text', {unique: true})
    email: string;

    @Column('text', {select: false})
    password: string;

    @Column('text', {array: true, default: ['user']})
    roles: string[];

    @BeforeInsert()
    checkEmail(): void {
        this.email = this.email.toLowerCase();
    }

    @BeforeInsert()
    checkEmailUpdate(): void {
        this.checkEmail();
    }
}