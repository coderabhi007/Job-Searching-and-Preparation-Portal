import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    authID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String },
    passoutYear: { type: Number },
    collegeName: { type: String },
    experience: { type: Number }, // in years
    skills: [{ type: String }],
    resume: { type: String }, // file path or cloud link
    description: { type: String },
    githubProfile: { type: String },
    leetcodeProfile: { type: String },
    linkedinProfile: { type: String },
    portfolioUrl: { type: String },
    profileImage: { type: String },
},{ timestamps: true });
const User = mongoose.model("User", userSchema);
export default User;