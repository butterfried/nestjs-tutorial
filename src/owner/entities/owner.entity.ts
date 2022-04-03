import { Cat } from "src/cat/entities/cat.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Owner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 10 })
    phone: string;

    @Column({ length: 500 })
    address: string;

    @OneToMany(() => Cat, (cat) => cat.owner, {lazy: true})
    cats: Cat[];
}
