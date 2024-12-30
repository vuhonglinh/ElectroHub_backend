import { Post } from "src/posts/entities/post.entity";
import { Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany, Entity, JoinColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Post, (post) => post.user_id)
    posts: Post
}
