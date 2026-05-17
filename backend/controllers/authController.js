import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/index.js";

export const signup = async(req,res)=>{
  try{

    const {
      name,
      email,
      password,
      role
    } = req.body;
    
    if(!name || !email || !password){

      return res.status(400).json({
        message:"All fields required"
      });

    }

    const existingUser = await User.findOne({
      where:{ email }
    });

    if(existingUser){

      return res.status(400).json({
        message:"User already exists"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password,10);

    const user = await User.create({

      name,
      email,
      password:hashedPassword,
      role

    });

    res.status(201).json({
      success:true,
      message:"User registered successfully",
      user
    });

  }
  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

export const login = async(req,res)=>{

  try{

    const { email,password } = req.body;

    if(!email || !password){

      return res.status(400).json({
        message:"All fields required"
      });

    }

    const user = await User.findOne({
      where:{ email }
    });

    if(!user){

      return res.status(404).json({
        message:"User not found"
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if(!isMatch){

      return res.status(400).json({
        message:"Invalid credentials"
      });

    }

    const token = jwt.sign(

      {
        id:user.id,
        role:user.role
      },

      process.env.JWT_SECRET,

      {
        expiresIn:"7d"
      }

    );

    res.status(200).json({

      success:true,
      message:"Login successful",

      token,

      user:{
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role
      }

    });

  }
  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });

    return res.status(200).json({
      success: true,
      users,
    });
    
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};