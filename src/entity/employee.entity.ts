import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Address from "./address.entity";

import { Department } from "./department.entity";
import { Status } from "../utils/status.enum";
import { Role } from "../utils/role.enum";
import AbstractEntity from "./abstract.entity";

@Entity("employees")
class Employee extends AbstractEntity{
 

    @Column()
    name:string;

    @Column()
    username: string;

    @Column()
    password:string;


    @Column()
    joiningDate: string;

    @Column()
    experience: number ;

    @Column()
    status: Status;

    @ManyToOne(() => Department, (department) => department.id)
  @JoinColumn()
  department: Department;
  
   
    @OneToOne(() => Address,{cascade:true})
    @JoinColumn()
    address: Address

    @Column({ default: Role.DEVELOPER })
  role: Role;

}
export default Employee;
