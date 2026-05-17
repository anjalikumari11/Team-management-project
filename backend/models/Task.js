import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Task = sequelize.define("Task",{

  title:{
    type:DataTypes.STRING,
    allowNull:false
  },

  description:{
    type:DataTypes.TEXT
  },

  dueDate:{
    type:DataTypes.DATE
  },

  priority:{
    type:DataTypes.ENUM(
      "Low",
      "Medium",
      "High"
    ),
    defaultValue:"Medium"
  },

  status:{
    type:DataTypes.ENUM(
      "To Do",
      "In Progress",
      "Done"
    ),
    defaultValue:"To Do"
  }

});

export default Task;