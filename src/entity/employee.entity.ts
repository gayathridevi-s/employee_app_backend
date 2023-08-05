import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Address from "./address.entity";
import { Role } from "./role.entity";
import { Department } from "./department.entity";
import { Status } from "../utils/status.enum";

@Entity("employees")
class Employee{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    password:string;


    @Column()
    joiningDate: string;

    @Column()
    experience: number ;

    @Column()
    status: Status;

    @ManyToOne(() => Department, { nullable: true })
    department: Department;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

     @DeleteDateColumn()
    deletedAt:Date;
   
    @OneToOne(() => Address,{cascade:true})
    @JoinColumn()
    address: Address

    @ManyToOne(() => Role, { nullable: true })
    role: Role


}
export default Employee;
