import { Note } from "src/notes/entities/note.entity";
import { Role } from "src/utilities/roles.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    firstName: string;

    @Column({ type: 'varchar', length: 30 })
    lastName: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'varchar', length: 40, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 15, unique: true })
    username: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'int' })
    age: number;

    @Column({ type: 'enum', enum: Role })
    role: string;

    @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
    /**
     * m - male
     * f - female
     * u - unspecified
     */
    gender: string;

    // @OneToMany(() => Note, (note: Note) => note.userId, {
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE'
    // })
    // notes: Note[];
}
