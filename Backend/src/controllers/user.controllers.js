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
        console.log("details1",details);
        details.email=email;
        details.authId=authId;
        console.log("details",details);
        //create user object
        const user = new User({
            ...details
        })
        console.log(user);
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
        console.log("authId",authId);
      // Find the user
      const user = await User.findOne({ authId: authId });
  console.log(user);
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
async function otherDetails(req,res){
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
async function addProfilePic(req,res){
    try {
        const authId=req.user._id
        //check if user already exists
        const user=await User.findOne({authId:authId})
        if(!user){
            return res.status(400).json(new ApiError(400, "User not found."));
        }
        const file=req.files.profilePic[0];
        const result=await uploadOnCloudinary(file.path,"profilePic")
        //update profilePic in database
        user.profileImage=result.secure_url;
        const savedUser=await user.save();
        return res.status(200).json(new ApiResponse("Profile picture updated successfully", savedUser));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error", error.message));
    }
}
async function addResume(req,res){
    try {
        const authId=req.user._id
        //check if user already exists
        const user=await User.findOne({authId:authId})
        if(!user){
            return res.status(400).json(new ApiError(400, "User not found."));
        }
        const file=req.files.resume[0];
        const result=await uploadOnCloudinary(file.path,"resume")
        //update resume in database
        user.resume=result.secure_url;
        const savedUser=await user.save();
        return res.status(200).json(new ApiResponse("Resume updated successfully", savedUser));
    }
    catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error", error.message));
    }
}
export {createUser,updateUser,educationalDetails,otherDetails,addProfilePic,addResume};
