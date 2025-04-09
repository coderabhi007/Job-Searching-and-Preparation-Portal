import { auth } from "../models/auth.model.js";
import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import jwt from "jsonwebtoken";
async function Auth(req,res){
    try {
        const refreshToken = req.cookies.refreshToken;
        const accessToken = req.cookies.accessToken;
        if(accessToken){
            const user =  jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);

            if(user){
                req.user=user;
                next();
            }
        }
        if(refreshToken){
            const token = jwt.verify(accessToken,process.env.REFRESH_TOKEN_SECRET);
           if(token){
            const user =  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
            const existedUser = await auth.findById(user._id).select("-password -refreshToken");
            if(!existedUser) return res.status(401).json(new ApiError(401,"Unauthorized"));
            const newAccessToken = existedUser.generateAccessToken();
            return res.cookie("accessToken",newAccessToken,{httpOnly:true})
            .status(204).json(new ApiResponse({status:204,message:"Access token generated successfully"}))
           }
           else return res.status(401).json(new ApiError(401,"Unauthorized"));
           
        }
        return res.status(401).json(new ApiError(401,"Unauthorized"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error"));
        
    }
}
export default Auth;