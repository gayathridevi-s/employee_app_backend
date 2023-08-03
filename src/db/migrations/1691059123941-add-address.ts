import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddress1691059123941 implements MigrationInterface {
    name = 'AddAddress1691059123941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Address" ("id" SERIAL NOT NULL, "line1" character varying NOT NULL, "pincode" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_9034683839599c80ebe9ebb0891" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "address_id" integer`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "UQ_f78c7626af1498a0d6e505ea92b" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_f78c7626af1498a0d6e505ea92b" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_f78c7626af1498a0d6e505ea92b"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "UQ_f78c7626af1498a0d6e505ea92b"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "address_id"`);
        await queryRunner.query(`DROP TABLE "Address"`);
    }

}
