import { ApiResponse } from "../util/ApiResponse.js";
import { ApiError } from "../util/ApiError.js";
import {uploadOnCloudinary} from "../util/Cloudnary.js"
import User from "../models/user.model.js";
import  {auth as Auth}  from "../models/auth.model.js";
import { trusted } from "mongoose";
async function createUser(req,res){
    try {
        const authId=req.user._id
        //check if user already exists
        const auth=await Auth.findById(authId).select("-password -refreshToken");
        const email=auth.email;
        //cheak if user already exists
        const userExist=await User.findOne({where:{authId:authId}});
        if(userExist){
            return res.status(400).json(new ApiError(400, "User already exists."));
        }
        const{ name,contact,address}=req.body;
        if(!name || !contact || !address){
            return res.status(400).json(new ApiError("Bad Request", "Please fill all the required fields."));
        }
        const details=req.body;
        details.email=email;
        //create user object
        const user = new User({
            ...details,
            authId:authId
        })
        //save user to database
        const savedUser=await user.save();
        return res.status(200).json(new ApiResponse("User created successfully", savedUser));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiError("Internal Server Error", error.message));
        
    }
}
async function updateUser(req, res) {
    try {
      const authId = req.user._id;
  
      // Find the user
      const user = await User.findOne({ authId: authId });
  
      if (!user) {
        return res.status(404).json(new ApiError(404, "User not found."));
      }
  
      // Update fields from request body
      Object.assign(user, req.body);
  
      // Save the updated user
      const savedUser = await user.save();
  
      return res.status(200).json(new ApiResponse("User updated successfully", savedUser));
    } catch (error) {
      console.log(error);
      return res.status(500).json(new ApiError(500, "Internal Server Error", error.message));
    }
  }
async function educationalDetails(req,res){
    try {
        const authId=req.user._id
        //check if user already exists
        const user=await User.findOne({authId:authId})
        if(!user){
            return res.status(400).json(new ApiError(400, "User not found."));
        }
        Object.assign(user, req.body);
        const savedUser=await user.save();
        return res.status(200).json(new ApiResponse("User updated successfully", savedUser));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiError(500, "Internal Server Error", error.message));
    }
}  