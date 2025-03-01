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
auth.pre("save",async function(next){
    if(!this.isModified("password")) return next()
        this.password = await bcrypt.hash(this.password, 10)
    next()
})
auth.methods.comparePassword(async function(password){
    return await bcrypt.compare(password,this.password)
})
export const  auth=mongoose.model('auth',authSchema);