import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    authID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String },
    address:{
        type: String,
        required: true,
    },
    passoutYear: { type: Number ,required: true }, // e.g. 2023
    collegeName: { type: String,required: true }, // e.g. "XYZ University"
    branch: { type: String,required: true }, // e.g. "Computer Science"
    cgpa: { type: Number,required:true }, // e.g. 8.5
    experience: { type: Number }, // in years
    skills: [{ type: String }],
    resume: { type: String }, // file path or cloud link
    description: { type: String },
    githubProfile: { type: String },
    leetcodeProfile: { type: String },
    portfolioUrl: { type: String },
    profileImage: { type: String },
    projects:[{
        title: { type: String },
        description: { type: String },
        link: { type: String },
        githubLink: { type: String },
        techStack: [{ type: String }],
    }],
    resume: { type: String }, // file path or cloud link
},{ timestamps: true });
const User = mongoose.model("User", userSchema);
export default User;