import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Address from "./address.entity";

@Entity("employees")
class Employee{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    email:string;
    @CreateDateColumn()
    createdAt:Date;
    @UpdateDateColumn()
    updatedAt:Date;
     @DeleteDateColumn()
    deletedAt:Date;
    @Column({nullable:true})
    age:number;
    @OneToOne(() => Address,{cascade:true})
    @JoinColumn()
    address: Address

}
export default Employee;
