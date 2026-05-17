import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "task_management",
  "root",
  "mysql",
  {
    host: "localhost",
    dialect: "mysql"
  }
);

export default sequelize;