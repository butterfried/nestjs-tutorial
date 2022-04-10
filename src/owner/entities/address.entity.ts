import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Owner } from "./owner.entity";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200 })
    address: string;

    @Column({ length: 100 })
    subDistrict: string;

    @Column({ length: 100 })
    district: string;

    @Column({ length: 100 })
    province: string;

    @OneToOne(() => Owner, (owner) => owner.address, {lazy: true})
    owner: Owner;
}
