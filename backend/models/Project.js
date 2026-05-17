import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Project = sequelize.define("Project",{

  title:{
    type:DataTypes.STRING,
    allowNull:false
  },

  description:{
    type:DataTypes.TEXT
  }

});

export default Project;