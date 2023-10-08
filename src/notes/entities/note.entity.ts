import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Note {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 40 })
    title: string;

    @Column({ type: 'varchar', length: 10000 })
    content: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'boolean', default: false })
    isShared: boolean;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdOn: Date;

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updatedOn: Date;

    @Column({ type: 'timestamptz', nullable: true })
    deletedOn: Date;

    // @ManyToOne(() => User, (user: User) => user.notes, {
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE'
    // })

    // userId: User;
    @Column({ type: 'integer', nullable: true })
    userId: number;
}
