import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const authSchema=new mongoose.Schema({
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
export const  auth=mongoose.model('Auth',authSchema);