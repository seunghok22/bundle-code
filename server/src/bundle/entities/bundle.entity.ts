import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Bundle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @ManyToOne(() => User, (user) => user.bundles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    title: string;

    @Column()
    code: string;

    @Column()
    platform: string;

    @Column({ type: 'timestamp', nullable: true })
    purchased_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    expires_at: Date;

    @Column({ nullable: true })
    source: string; // e.g. Humble Bundle, Fanatical

    @Column({ nullable: true })
    price: string;

    @Column({ type: 'text', nullable: true })
    memo: string;

    @Column({ default: true })
    is_public: boolean; // Controls if the item is visible in public lists (masked)

    @CreateDateColumn()
    created_at: Date;
}
