import { MigrationInterface, QueryRunner } from "typeorm";

export class RoleToEmployee1691138136266 implements MigrationInterface {
    name = 'RoleToEmployee1691138136266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "role" character varying NOT NULL DEFAULT 'Developer'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role"`);
    }

}
