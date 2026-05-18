import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "railway",
  "root",
  "TKsUecEUubhYQXVMiMIZmvsSiQRGJduu",
  {
    host: "trolley.proxy.rlwy.net",
    port: 26535,
    dialect: "mysql",
    logging: false
  }
);
export default sequelize;
