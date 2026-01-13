import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Bundle } from '../../bundle/entities/bundle.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    googleId: string;

    @Column()
    nickname: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Bundle, (bundle) => bundle.user)
    bundles: Bundle[];
}
