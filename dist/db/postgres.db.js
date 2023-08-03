"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const employee_entity_1 = __importDefault(require("../entity/employee.entity"));
const address_entity_1 = __importDefault(require("../entity/address.entity"));
const dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 8765,
    username: "postgres",
    password: "postgres",
    database: "training",
    entities: [employee_entity_1.default, address_entity_1.default],
    logging: true,
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    migrations: ["dist/db/migrations/*.js"],
    migrationsTableName: "trainig_migrations"
});
exports.default = dataSource;
//# sourceMappingURL=postgres.db.js.map