import ApiError from '../errors/ApiError.js';
import ApiResponse from '../responses/ApiResponse.js';
import {auth as Auth} from '../models/auth.model.js';
import Email from '../util/Email.js';
async function Register(req,res){
    try {
        let {isGoogleLogin,email}=req.body;
        if(!email) return res.status(400).json(new ApiError(101,"Email not present"));
        const existedUser=Auth.findOne({email})
    if(existedUser) return res.status(400).json(new ApiError(106,"Email already exists"));
    let user;
    if(isGoogleLogin){
        let {googleId}=req.body;
        if(!googleId) return res.status(400).json(new ApiError(107,"Google Id not present"));
        user=await Auth.create({email,googleId});
    }
    else{
        let {password,conformPassword}=req.body;
        if(!password || !conformPassword) return res.status(400).json(new ApiError(103,"Password not present"));
        if(password !== conformPassword) return res.status(400).json(new ApiError(104,"Password and confirm password do not match"));
        user=await Auth.create({email,password});
    }
       if(!user) return res.status(400).json(new ApiError(108,"User could not be created"));
         await Email(email,"Account Creation Confirmation","Your account has been created successfully.");
         return res.status(200).json(new ApiResponse(200,"User created successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
}