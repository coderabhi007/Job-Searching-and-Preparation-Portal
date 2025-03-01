import {ApiError} from '../util/ApiError.js';
import {ApiResponse} from '../util/ApiResponse.js';
import {auth as Auth} from '../models/auth.model.js';
import Email from '../util/Email.js';
import jwt from 'jsonwebtoken';
async function Register(req,res){
    try {
        let {isGoogleLogin,email,userType}=req.body;
        if(!email) return res.status(400).json(new ApiError(101,"Email not present"));
        const existedUser=Auth.findOne({email})
    if(existedUser) return res.status(400).json(new ApiError(106,"Email already exists"));
    let user;
    if(isGoogleLogin){
        let {googleId}=req.body;
        if(!googleId) return res.status(400).json(new ApiError(107,"Google Id not present"));
        user=await Auth.create({email,googleId,userType});
    }
    else{
        let {password,conformPassword}=req.body;
        if(!password || !conformPassword) return res.status(400).json(new ApiError(103,"Password not present"));
        if(password !== conformPassword) return res.status(400).json(new ApiError(104,"Password and confirm password do not match"));
        user=await Auth.create({email,password,userType});
    }
       if(!user) return res.status(400).json(new ApiError(108,"User could not be created"));
         await Email(email,"Account Creation Confirmation","Your account has been created successfully.");
         return res.status(200).json(new ApiResponse(200,"User created successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}
async function Login(req,res){
    try {
        let {email,userType}=req.body;
        if(!email) return res.status(400).json(new ApiError(101,"Email not present"));
        let auth;
        if(req.body.googleId){
            let {googleId}=req.body;
            if(!googleId) return res.status(400).json(new ApiError(107,"Google Id not present"));
             auth=await Auth.findOne({email});
            if(!auth) return res.status(400).json(new ApiError(109,"User not found"));
            if(auth.googleId!==googleId) return res.status(400).json(new ApiError(110,"Invalid login"));}
            else{
                let {password}=req.body;
                if(!password) return res.status(400).json(new ApiError(103,"Password not present"));
                auth=await Auth.findOne({email});
                if(!auth) return res.status(400).json(new ApiError(109,"User not found"));
                if(auth.password!==password) return res.status(400).json(new ApiError(111,"Invalid login"));

            }
            if(auth.userType!==userType) return res.status(400).json(new ApiError(112,"Invalid request"));
            const accessToken=auth.generateAccessToken();
            const refreshToken=auth.generateRefreshToken();
            auth.refreshToken=refreshToken;
            await auth.save({validateBeforeSave:false});
            //access & refesh token will be stored in cookies as weell as resopnce
            res.cookie("accessToken",accessToken,{httpOnly:true})
            .cokkie("refreshToken",refreshToken,{httpOnly:true})
            .status(200)
            .json(new ApiResponse(200,{accessToken,refreshToken},"User logged in successfully"));
            
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}
async function resetPassword(req,res){
    try {
        let{email,newPassword,isConformed}=req.body;
        if(!email) return res.status(400).json(new ApiError(101,"Email not present"));
        if(!newPassword) return res.status(400).json(new ApiError(103,"Password not present"));
        if(!isConformed) return res.status(400).json(new ApiError(112,"invalid request"));
        const auth=await Auth.findOne({email});
        if(!auth) return res.status(400).json(new ApiError(109,"User not found"));
        auth.password=newPassword;
        auth.refreshToken=null;
        await auth.save();
        return res.status(200).json(new ApiResponse(200,"Password reset successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}
export {Register,Login,resetPassword};