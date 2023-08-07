import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifiedAddressEntity1691387918617 implements MigrationInterface {
    name = 'ModifiedAddressEntity1691387918617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Address" DROP CONSTRAINT "FK_87759c7e4cf228e6f5086a3affb"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_f78c7626af1498a0d6e505ea92b"`);
        await queryRunner.query(`ALTER TABLE "Address" DROP CONSTRAINT "REL_87759c7e4cf228e6f5086a3aff"`);
        await queryRunner.query(`ALTER TABLE "Address" DROP COLUMN "employee_id"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "REL_f78c7626af1498a0d6e505ea92"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "role" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ALTER COLUMN "role" SET DEFAULT 'Developer'`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "address_id" integer`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "REL_f78c7626af1498a0d6e505ea92" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "Address" ADD "employee_id" integer`);
        await queryRunner.query(`ALTER TABLE "Address" ADD CONSTRAINT "REL_87759c7e4cf228e6f5086a3aff" UNIQUE ("employee_id")`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_f78c7626af1498a0d6e505ea92b" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Address" ADD CONSTRAINT "FK_87759c7e4cf228e6f5086a3affb" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
