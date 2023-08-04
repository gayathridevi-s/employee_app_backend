import { MigrationInterface, QueryRunner } from "typeorm";

export class PasswordToEmployee1691126278193 implements MigrationInterface {
    name = 'PasswordToEmployee1691126278193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Address" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "Address" ADD "password" character varying NOT NULL`);
    }

}
