import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column({ nullable: true })
    parent_id: number;

    @OneToMany(() => Category, (category) => category.parent_id)
    parent: Category[]
}


export const CategoryResource = {
    id: true,
    name: true,
    slug: true,
}