import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
    companyName: { type: String, required: true, unique: true },
    branches: [{ type: String }],// // Branches of the company
    email: { type: String, required: true }, // General company email
    contactNumber: { type: String }, // General company phone
    hrName: { type: String },         // HR contact person
    hrEmail: { type: String },        // HR email
    hrPhone: { type: String },        // HR phone number
    description: { type: String },
    tech: [{ type: String }],         // Tech stack
    members: { type: Number },        // Total employees
    websiteLink: { type: String },
    establishment: { type: Number },  // Year of establishment
    createdAt: { type: Date, default: Date.now }
},{ timestamps: true });

const Company = mongoose.model("Company", companySchema);
export default Company;