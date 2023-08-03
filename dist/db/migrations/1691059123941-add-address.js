"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAddress1691059123941 = void 0;
class AddAddress1691059123941 {
    constructor() {
        this.name = 'AddAddress1691059123941';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "Address" ("id" SERIAL NOT NULL, "line1" character varying NOT NULL, "pincode" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_9034683839599c80ebe9ebb0891" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "employees" ADD "address_id" integer`);
            yield queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "UQ_f78c7626af1498a0d6e505ea92b" UNIQUE ("address_id")`);
            yield queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_f78c7626af1498a0d6e505ea92b" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_f78c7626af1498a0d6e505ea92b"`);
            yield queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "UQ_f78c7626af1498a0d6e505ea92b"`);
            yield queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "address_id"`);
            yield queryRunner.query(`DROP TABLE "Address"`);
        });
    }
}
exports.AddAddress1691059123941 = AddAddress1691059123941;
//# sourceMappingURL=1691059123941-add-address.js.map