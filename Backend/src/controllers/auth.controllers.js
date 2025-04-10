import {ApiError} from '../util/ApiError.js';
import {ApiResponse} from '../util/ApiResponse.js';
import {auth as Auth} from '../models/auth.model.js';
import Email from '../util/Email.js';
import jwt from 'jsonwebtoken';
async function isRegisterd(req,res){
    try{
       // console.log("Abhishek")
        let {email}=req.body;
        if(!email) return res.status(400).json(new ApiError(101,"Email not present"));
        //email regex
        if(!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) return res.status(400).json(new ApiError(105,"Invalid email"));
        const existedUser= await Auth.findOne({email});
       // console.log(existedUser);
        if(!existedUser) return res.status(201).json(new ApiResponse(201,"User not found"));
        //if user is not registered then return 200 status code with message
      //  console.log(existedUser);
        return res.status(400).json(new ApiError(400,"User is already registered"));
    }
    catch(error){
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}
async function Register(req,res){
    try {
        let {email,userType}=req.body;
        if(!email) return res.status(400).json(new ApiError(101,"Email not present"));
        //email regex
        if(!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) return res.status(400).json(new ApiError(105,"Invalid email"));
        //cheak if userType is present or not rtururn user type should be present   
        if(!userType) return res.status(400).json(new ApiError(102,"User type not present"));
        const existedUser= await Auth.findOne({email});
       // console.log(existedUser);
     
    if(existedUser) return res.status(400).json(new ApiError(106,"Email already exists"));
   
   
   
        let {password,conformPassword}=req.body;
        if(!password || !conformPassword) return res.status(400).json(new ApiError(103,"Password not present"));
        if(password !== conformPassword) return res.status(400).json(new ApiError(104,"Password and confirm password do not match"));
        console.log('done');
        //error here in creating user
        const user = new Auth({email,password,userType});
        console.log(user);
    
        //user.save(); is not working here so we use await



        await user.save();//this is not working
       
        
       if(!user) return res.status(400).json(new ApiError(108,"User could not be created"));
         await Email(email,"Account Creation Confirmation","Your account has been created successfully.");
         return res.status(200).json(new ApiResponse(200,{},"User created successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}
async function googleRegister(req,res){
    try {
        let {googleId,email,userType}=req.body;
        if(!email) return res.status(400).json(new ApiError(101,"Email not present"));
        //email regex
        if(!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) return res.status(400).json(new ApiError(105,"Invalid email"));
        //cheak if userType is present or not rtururn user type should be present
        if(!userType) return res.status(400).json(new ApiError(102,"User type not present"));
      
        const existedUser=await Auth.findOne({email});

        if(existedUser) return res.status(400).json(new ApiError(106,"Email already exists"));
        const user=await Auth.create({email,googleId,userType});
        if(!user) return res.status(400).json(new ApiError(108,"User could not be created"));
        await Email(email,"Account Creation Confirmation","Your account has been created successfully.");
        return res.status(200).json(new ApiResponse(200,{},"User created successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
        
    }
}
async function Login(req,res){
    try {
        let {email,userType}=req.body;
        if(!email) return res.status(400).json(new ApiError(101,"Email not present"));
        let auth;
      
            
                let {password}=req.body;
                console.log(password);
                if(!password) return res.status(400).json(new ApiError(103,"Password not present"));
                auth=await Auth.findOne({email});
               
                if(!auth) return res.status(400).json(new ApiError(109,"User not found"));
                //first 
                if(!await auth.comparePassword(password)) return res.status(400).json(new ApiError(111,"Invalid login"));

            
            if(auth.userType!==userType) return res.status(400).json(new ApiError(112,"Invalid request"));
       
            const accessToken=auth.generateAccessToken();//this is not working what to do?
          
            const refreshToken=auth.generateRefreshToken();
         
            auth.refreshToken=refreshToken;
         
            await auth.save({validateBeforeSave:false});
           
           
           return res.cookie("accessToken",accessToken,{httpOnly:true})
            .cookie("refreshToken",refreshToken,{httpOnly:true})
            .status(200)
            .json(new ApiResponse(200,{email:auth.email,userType:auth.userType},"User logged in successfully"));
            
    } catch (error) {
       console.log(error);
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}
async function googleLogin(req,res){
    try {
        let {googleId,email}=req.body;
        let auth=await Auth.findOne({email});
        if(!auth) return res.status(400).json(new ApiError(109,"User not found"));
        if(auth.googleId!==googleId) return res.status(400).json(new ApiError(110,"Invalid login"));
        const accessToken=auth.generateAccessToken();
        const refreshToken=auth.generateRefreshToken();
        auth.refreshToken=refreshToken;
        await auth.save({validateBeforeSave:false});
        res.cookie("accessToken",accessToken,{httpOnly:true}).
        cookie("refreshToken",refreshToken,{httpOnly:true})
        .status(200)
        .json(new ApiResponse(200,{email:auth.email,userType:auth.userType},"User logged in successfully"));
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
        //password is not being hashed

        auth.password=newPassword;
        auth.refreshToken=null;
        await auth.save({validateBeforeSave:false});
        return res.status(200).json(new ApiResponse(200,{},"Password reset successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}
//create logout function wich will clear the cookies
async function logout(req,res){
    try {
        //clear refrsh token from db
        const auth=await Auth.findById(req.user._id);
        auth.refreshToken=null; 
        await auth.save({validateBefore
        :false})    
       
        //clear cookies
        res.clearCookie("accessToken")
        .clearCookie("refreshToken").ApiError(200,{},"User logged out successfully");
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
        
    }
}
export {Register,Login,resetPassword,googleRegister,googleLogin,isRegisterd};