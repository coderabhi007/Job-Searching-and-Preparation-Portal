import mongoose from "mongoose";
import Interviewer from "./interviwer.model";
const timeSlotSchema = new mongoose.Schema({
  startTime: { type:String, required: true },
  endTIme:{
    type:String,
    required: true
  },
  date:{
    type:Date,
    required: true
  },
  skills:{
    type: [String], required: true
  }
  ,
  InterviewerId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Interviewer'
  }
})
const TimeSlot= mongoose.model('TimeSlot', timeSlotSchema);
export default TimeSlot;