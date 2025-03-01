import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const authSchema=new mongoose.Schema({
    userType: {
        type: String,
        enum: ["User", "Company", "Interviewer"], 
        required: true,
      },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,

    },
    refreshToken:{
        type:String
    },
    googleId:{
        type:String
    },

},{timestamps:true})
authSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
        this.password = await bcrypt.hash(this.password, 10)
    next()
})
authSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}
authSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userType: this.userType
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
authSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const  auth=mongoose.model('Auth',authSchema);