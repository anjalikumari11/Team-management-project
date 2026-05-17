import {
  Task,
  Project,
  User
} from "../models/index.js";

export const createTask = async(req,res)=>{

  try{

    const {
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      projectId
    } = req.body;

    if(!title || !projectId){

      return res.status(400).json({
        message:"Title & projectId required"
      });

    }

    const project =
      await Project.findByPk(projectId);

    if(!project){

      return res.status(404).json({
        message:"Project not found"
      });

    }

    if(project.adminId !== req.user.id){

      return res.status(403).json({
        message:"Only admin can create tasks"
      });

    }

    const user =
      await User.findByPk(assignedTo);

    if(!user){

      return res.status(404).json({
        message:"Assigned user not found"
      });

    }

    const task = await Task.create({

      title,
      description,
      dueDate,
      priority,

      assignedTo,

      projectId

    });

    res.status(201).json({

      success:true,
      message:"Task created",

      task

    });

  }
  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

export const getTasks = async(req,res)=>{

  try{

    let tasks;

    if(req.user.role === "Admin"){

      tasks = await Task.findAll({

        include:[
          {
            model:User,
            attributes:["id","name","email"]
          },
          {
            model:Project,
            attributes:["id","title"]
          }
        ]

      });

    }

    else{

      tasks = await Task.findAll({

        where:{
          assignedTo:req.user.id
        },

        include:[
          {
            model:Project,
            attributes:["id","title"]
          }
        ]

      });

    }

    res.status(200).json({

      success:true,
      tasks

    });

  }
  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

export const updateTaskStatus = async(req,res)=>{

  try{

    const { taskId } = req.params;

    const { status } = req.body;

    const task =
      await Task.findByPk(taskId);

    if(!task){

      return res.status(404).json({
        message:"Task not found"
      });

    }

    if(

      task.assignedTo !== req.user.id &&

      req.user.role !== "Admin"

    ){

      return res.status(403).json({
        message:"Access denied"
      });

    }

    task.status = status;

    await task.save();

    res.status(200).json({

      success:true,
      message:"Task updated",

      task

    });

  }
  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

export const deleteTask = async(req,res)=>{

  try{

    const { taskId } = req.params;

    const task =
      await Task.findByPk(taskId);

    if(!task){

      return res.status(404).json({
        message:"Task not found"
      });

    }

    await task.destroy();

    res.status(200).json({

      success:true,
      message:"Task deleted"

    });

  }
  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};