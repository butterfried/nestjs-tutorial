import { Cat } from "src/cat/entities/cat.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";

@Entity()
export class Owner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 10 })
    phone: string;

    @OneToMany(() => Cat, (cat) => cat.owner, {lazy: true})
    cats: Cat[];

    @OneToOne(() => Address, (address) => address.owner, {nullable: true, eager: true})
    @JoinColumn()
    address: Address
}
