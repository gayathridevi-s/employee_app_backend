import { OneToMany } from "typeorm/decorator/relations/OneToMany";
import Employee from "./employee.entity";
import { Column } from "typeorm/decorator/columns/Column";
import { Entity, PrimaryGeneratedColumn } from "typeorm";
import AbstractEntity from "./abstract.entity";
@Entity()
export class Department extends AbstractEntity{

   
    
    @Column()
    name: string;

    @OneToMany(() => Employee, (employee) => employee.department)
    employees: Employee
}