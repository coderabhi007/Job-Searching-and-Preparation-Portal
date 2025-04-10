import { auth } from "../models/auth.model.js";
import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import jwt from "jsonwebtoken";
<<<<<<< HEAD
async function Auth(req,res,next){
=======
async function Auth(req, res, next) {
>>>>>>> 7c0c978ed71e4343ed2eeda46b3e712563453668
    try {
        const refreshToken = req.cookies?.refreshToken;
        const accessToken = req.cookies?.accessToken;
        //console.log("ABhi")

<<<<<<< HEAD
            if(user){
                req.user=user;
               return next();
=======
        if (accessToken) {

            const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

            if (user) {
                req.user = user;
                //console.log(user);
                return next();
                // console.log("Sutar");
>>>>>>> 7c0c978ed71e4343ed2eeda46b3e712563453668
            }
        }
        if (refreshToken) {
            console.log(refreshToken)
            const token = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            console.log(token);
            if (token) {
                const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                const existedUser = await auth.findById(user._id).select("-password -refreshToken");
                if (!existedUser) return res.status(401).json(new ApiError(401, "Unauthorized"));
                const newAccessToken = existedUser.generateAccessToken();
                return res.cookie("accessToken", newAccessToken, { httpOnly: true })
                    .status(204).json(new ApiResponse({ status: 204, message: "Access token generated successfully" }))
            }
            else return res.status(401).json(new ApiError(401, "Unauthorized"));

        }
        return res.status(401).json(new ApiError(401, "Unauthorized"));
    } catch (error) {
<<<<<<< HEAD
        console.log("error in auth middleware",error);
=======
        console.log(error);
>>>>>>> 7c0c978ed71e4343ed2eeda46b3e712563453668
        return res.status(500).json(new ApiError(500, "Internal Server Error"));

    }
}
<<<<<<< HEAD
export { Auth};
=======
export { Auth }
>>>>>>> 7c0c978ed71e4343ed2eeda46b3e712563453668
