import jwt from "jsonwebtoken";

import { User } from "../models/index.js";

const verifyToken = async(req,res,next)=>{

  try{

    // Get token
    const authHeader =
      req.headers.authorization;

    if(!authHeader){

      return res.status(401).json({
        message:"No token provided"
      });

    }


    // Remove Bearer
    const token =
      authHeader.split(" ")[1];


    // Verify token
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );


    // Find user
    const user = await User.findByPk(
      decoded.id
    );

    if(!user){

      return res.status(404).json({
        message:"User not found"
      });

    }


    // Store user in request
    req.user = user;

    next();

  }
  catch(error){

    res.status(401).json({
      message:"Invalid token"
    });

  }

};

export default verifyToken;