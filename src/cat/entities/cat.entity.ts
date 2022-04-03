import { Owner } from "src/owner/entities/owner.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 500 })
    description: string;

    @Column('int')
    age: number;

    @Column('int', { nullable: true })
    ownerId: number

    @ManyToOne(() => Owner, owner => owner.cats)
    owner: Owner;
}
