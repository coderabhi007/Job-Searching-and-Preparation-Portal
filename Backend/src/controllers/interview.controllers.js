import { ApiError } from "../util/ApiError.js";
import { ApiResponse } from "../util/ApiResponse.js";
import TimeSlot from "../models/timesolt.model.js";
import Interview from "../models/interviwe.model.js";
import Interviewer from "../models/interviwer.model.js";
import User from "../models/user.model.js";
const book = async (req, res) => {
    try {
      const { skill, date } = req.body;
      console.log("Skill:", skill);
  
      const authId = req.user._id;
      const student = await User.findOne({ authId: authId }); // FIX: added await
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      // Normalize date to get full day range
      const inputDate = new Date(date);
      inputDate.setHours(0, 0, 0, 0);
  
      const endOfDate = new Date(inputDate);
      endOfDate.setHours(23, 59, 59, 999);
  
      // Find available time slot for given skill and date
      const availableSlot = await TimeSlot.findOne({
        skills: { $in: [skill] },
        date: { $gte: inputDate, $lte: endOfDate },
        isBooked: false
      });
  
      // Debug log
      const allSlots = await TimeSlot.find();
      console.log("All slots in DB:");
      allSlots.forEach(slot => {
        console.log({
          skills: slot.skills,
          date: slot.date,
          isBooked: slot.isBooked
        });
      });
  
      if (!availableSlot) {
        return res.status(404).json({
          message: "No available slots for this skill on this date. Please try another date."
        });
      }
  
      // Schedule interview: start + 1hr duration
      const scheduledStartTime = new Date(`${date}T${availableSlot.startTime}`);
      const scheduledEndTime = new Date(scheduledStartTime.getTime() + 60 * 60 * 1000); // 1hr
  console.log(availableSlot.InterviewerId)
      // Create interview
      await Interview.create({
        userId: student._id,
        interviwerId: availableSlot.InterviewerId, // <- use schema's field name
        skill,
        date: inputDate,
        startTime: availableSlot.startTime,
        endTime: availableSlot.endTime
      });
      
  
      // Update timeSlot start time (+1.5 hr buffer)
      const updatedStartTime = new Date(scheduledStartTime.getTime() + 90 * 60 * 1000);
      const updatedStartStr = `${String(updatedStartTime.getHours()).padStart(2, "0")}:${String(updatedStartTime.getMinutes()).padStart(2, "0")}`;
  
      if (updatedStartStr < availableSlot.endTime) {
        await TimeSlot.updateOne(
          { _id: availableSlot._id },
          { $set: { startTime: updatedStartStr } }
        );
      } else {
        await TimeSlot.updateOne(
          { _id: availableSlot._id },
          { $set: { isBooked: true } }
        );
      }
  
      return res.status(200).json({
        message: "Interview scheduled successfully.",
        time: `${availableSlot.startTime} - ${availableSlot.endTime}`
      });
  
    } catch (error) {
      console.log("Booking Error:", error);
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  
// get intreviews for particular studnets
const getInterviwesBystudent=async (req,res)=>{
try {
        const authId=req.user._id;
        const studentId=await User.findOne({authId:authId});
        console.log(studentId)
        const data=await Interview.find({userId:studentId._id});
        console.log(data);
       res.status(200).json(new ApiResponse(200,data,"data fetched succesfully"));
} catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError("Internal Server Error", error.message));
}
}
const getInterviwesByInterviwer=async(req,res)=>{
    try {
        const authId=req.user._id;
        const interviewerId=await Interviewer.findOne({authId:authId})
        const data=await Interview.find({interviwerId:interviewerId._id});
        res.status(200).json(new ApiResponse(200,data,"data fetched succesfully"));
    } catch (error) {
        console.log(error);
    return res.status(500).json(new ApiError("Internal Server Error", error.message));
    }
}
const addSlot=async(req,res)=>{
   try {
     const {endTime,date,startTime,skills}=req.body
     if(!endTime && !Date && !startTime){
         res.status(400).json(new ApiError(400,"fill up all details"));
     }
     const authId=req.user._id;
     const interviewerId=await Interviewer.findOne({authId:authId})
     if(!interviewerId)
         res.status(400).json(new ApiError(400,"Wrong details"));
    // const skills=interviewerId.skills;
    const newSlot = new TimeSlot({
     startTime,
     endTime,
     date,
     skills,
     InterviewerId:interviewerId._id
   });
   const saved=await newSlot.save();
   res.status(200).json(new ApiResponse(200,{},"slot booked"))
   } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError("Internal Server Error", error.message));
   }

}
export{
    book,getInterviwesByInterviwer,getInterviwesBystudent,addSlot
}