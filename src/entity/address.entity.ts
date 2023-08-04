import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Employee from "./employee.entity";
import { AbstractEntity } from "./abstract.entity";

@Entity("Address")
class Address extends AbstractEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    line1: string;

    @Column()
    pincode: string;


}
export default Address;