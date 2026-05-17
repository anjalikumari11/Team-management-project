import {
  Project,
  User
} from "../models/index.js";

export const createProject = async(req,res)=>{

  try{

    const {
      title,
      description
    } = req.body;

    if(!title){

      return res.status(400).json({
        message:"Title required"
      });

    }

    const project = await Project.create({

      title,
      description,

      adminId:req.user.id

    });

    await project.addUser(req.user.id);

    res.status(201).json({

      success:true,
      message:"Project created",

      project

    });

  }
  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

export const getProjects = async(req,res)=>{

  try{

    const projects =
      await req.user.getProjects({

        include:[
          {
            model:User,
            attributes:["id","name","email"]
          }
        ]

      });

    res.status(200).json({
      success:true,
      projects
    });

  }
  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

export const addMember = async(req,res)=>{

  try{

    const { projectId } = req.params;

    const { userId } = req.body;

    const project =
      await Project.findByPk(projectId);

    if(!project){

      return res.status(404).json({
        message:"Project not found"
      });

    }

    if(project.adminId !== req.user.id){

      return res.status(403).json({
        message:"Only admin can add members"
      });

    }

    const user =
      await User.findByPk(userId);

    if(!user){

      return res.status(404).json({
        message:"User not found"
      });

    }

    await project.addUser(user);

    res.status(200).json({

      success:true,
      message:"Member added"

    });

  }
  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

export const removeMember = async(req,res)=>{

  try{

    const {
      projectId,
      userId
    } = req.params;

    const project =
      await Project.findByPk(projectId);

    if(!project){

      return res.status(404).json({
        message:"Project not found"
      });

    }

    if(project.adminId !== req.user.id){

      return res.status(403).json({
        message:"Only admin can remove members"
      });

    }

    const user =
      await User.findByPk(userId);

    if(!user){

      return res.status(404).json({
        message:"User not found"
      });

    }

    await project.removeUser(user);

    res.status(200).json({

      success:true,
      message:"Member removed"

    });

  }
  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};