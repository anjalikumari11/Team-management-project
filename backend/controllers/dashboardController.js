import { Op } from "sequelize";

import {
  Task,
  User
} from "../models/index.js";

export const getDashboard = async(req,res)=>{

  try{

    let whereCondition = {};

    if(req.user.role === "Member"){

      whereCondition.assignedTo =
        req.user.id;

    }

    const totalTasks =
      await Task.count({
        where:whereCondition
      });

    const completedTasks =
      await Task.count({

        where:{
          ...whereCondition,
          status:"Done"
        }

      });

    const pendingTasks =
      await Task.count({

        where:{
          ...whereCondition,
          status:"To Do"
        }

      });

    const inProgressTasks =
      await Task.count({

        where:{
          ...whereCondition,
          status:"In Progress"
        }

      });

    const overdueTasks =
      await Task.count({

        where:{

          ...whereCondition,

          dueDate:{
            [Op.lt]:new Date()
          },

          status:{
            [Op.ne]:"Done"
          }

        }

      });

    const tasksPerUser =
      await Task.findAll({

        attributes:[
          "assignedTo"
        ],

        include:[
          {
            model:User,
            attributes:["id","name","email"]
          }
        ]

      });

    res.status(200).json({

      success:true,

      dashboard:{

        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
        overdueTasks,
        tasksPerUser

      }

    });

  }
  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};