import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Address from "./address.entity";
import { AbstractEntity } from "./abstract.entity";
import { Role } from "../utils/role.enum";

@Entity("employees")
class Employee extends AbstractEntity{
   
    @Column()
    name:string;
    @Column()
    email:string;
    
    @Column({nullable:false})
    
    password:string;
    
    @Column({nullable:true})
    age:number;

    @OneToOne(() => Address,{cascade:true})
    @JoinColumn()
    address: Address

    @Column({default:Role.DEVELOPER})
    role:Role;
}
export default Employee;
