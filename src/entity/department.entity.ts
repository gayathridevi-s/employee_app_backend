import { OneToMany } from "typeorm/decorator/relations/OneToMany";
import Employee from "./employee.entity";
import { Column } from "typeorm/decorator/columns/Column";
import { Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Department{

    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    name: string;

    @OneToMany(() => Employee, (employee) => employee.department)
    employees: Employee
}