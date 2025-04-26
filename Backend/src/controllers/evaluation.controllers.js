import {ApiError} from '../util/ApiError.js';
import {ApiResponse} from '../util/ApiResponse.js';
import Interview from '../models/interviwe.model.js';
import StudentInterview from '../models/StudenInterview.model.js'
import User from '../models/user.model.js';
const skills=[
    {
      "name": "DSA",
      "subpoints": [
        "Arrays",
        "Strings",
        "Linked Lists",
        "Stacks",
        "Queues",
        "Hashing",
        "Trees",
        "Binary Search Trees",
        "Heaps",
        "Graphs",
        "Tries",
        "Recursion",
        "Dynamic Programming",
        "Greedy Algorithms",
        "Backtracking",
        "Divide and Conquer",
        "Sliding Window",
        "Two Pointers",
        "Bit Manipulation",
        "Disjoint Set"
      ]
    },
    {
      "name": "JavaScript",
      "subpoints": [
        "Variables & Data Types",
        "Operators",
        "Functions",
        "Arrays & Objects",
        "Loops & Conditions",
        "DOM Manipulation",
        "Event Handling",
        "Callbacks",
        "Promises",
        "Async/Await",
        "Closures",
        "Scope & Hoisting",
        "this Keyword",
        "ES6+ Features",
        "Classes & Inheritance",
        "Fetch API / Axios",
        "Error Handling",
        "JSON",
        "Modules"
      ]
    },
    {
      "name": "Java",
      "subpoints": [
        "Data Types & Variables",
        "Operators",
        "Loops & Control Flow",
        "Arrays",
        "Classes & Objects",
        "Inheritance",
        "Polymorphism",
        "Abstraction",
        "Encapsulation",
        "Exception Handling",
        "Collections Framework",
        "Threads & Concurrency",
        "File Handling",
        "Input/Output Streams",
        "Lambda Expressions",
        "Streams API",
        "JDBC",
        "Java 8 Features"
      ]
    },
    {
      "name": "C++",
      "subpoints": [
        "Variables & Data Types",
        "Operators",
        "Control Structures",
        "Arrays & Strings",
        "Functions",
        "Pointers & References",
        "Structures & Unions",
        "Classes & Objects",
        "Constructors & Destructors",
        "Inheritance",
        "Polymorphism",
        "STL - Vectors",
        "STL - Maps",
        "STL - Sets",
        "STL - Queues",
        "STL - Stacks",
        "STL - Priority Queues",
        "File I/O",
        "Templates",
        "Exception Handling"
      ]
    },
    {
      "name": "Python",
      "subpoints": [
        "Variables & Data Types",
        "Operators",
        "Conditional Statements",
        "Loops",
        "Functions",
        "Lists",
        "Tuples",
        "Sets",
        "Dictionaries",
        "String Manipulation",
        "File Handling",
        "Exception Handling",
        "OOP Concepts",
        "List Comprehensions",
        "Lambda Functions",
        "Modules & Packages",
        "Decorators",
        "Generators",
        "Iterators",
        "Regular Expressions",
        "venv & Pip",
        "Popular Libraries (NumPy, Pandas, Matplotlib)"
      ]
    }
  ]
  // i have yo send the data to frontend based on skill name
  async function getData(req,res){
   try {
     const skill=req.params.skill;
     console.log(skill)
     const data = skills.find(s => s.name === skill);
     console.log(data)
     res.status(200).json(new ApiResponse(200,data,"skill data"));
   } catch (error) {
        res.status(200).json(new ApiError(500,'internal server error'));
   }

  }  
  function average(values) {
    const numericValues = values.filter(val => typeof val === 'number' && !isNaN(val));
    if (numericValues.length === 0) return 0;
    const sum = numericValues.reduce((acc, val) => acc + val, 0);
    return sum / numericValues.length;
  }
  
  async function setData(req, res) {
    try {
    const { interviewId } = req.body;
      const skillName = req.params.skill;
      const incomingSubtopicMarks = req.body.subtopicMarks;
      
      if ( !skillName || !incomingSubtopicMarks) {
        return res.status(400).json(new ApiError(400, "Missing required data"));
      }
      const interview=await Interview.findById(interviewId)
     if(!interview)
      return res.status(400).json(new ApiError(400,"wrong data"));
    const studentId=interview.userId;
    const student=await StudentInterview.findOne({studentId})
  
      if(!student) {
        const totalMarks = average(Object.values(incomingSubtopicMarks));
        const newStudent = await StudentInterview.create({
          studentId,
          interviewRecords: [{
            skill: skillName,
            subtopicMarks: incomingSubtopicMarks,
            totalMarks
          }]
        });
        return res.status(201).json(new ApiResponse(201, newStudent, "New student and skill data saved."));
      }
  
      // Skill exists?
      const skillIndex = student.interviewRecords.findIndex(rec => rec.skill === skillName);
  
      if (skillIndex === -1) {
        // Skill doesn't exist yet
        const totalMarks = average(Object.values(incomingSubtopicMarks));
        student.interviewRecords.push({
          skill: skillName,
          subtopicMarks: incomingSubtopicMarks,
          totalMarks
        });
      } else {
        // Skill exists, update subtopics
        const existingMarks = student.interviewRecords[skillIndex].subtopicMarks;
        const updatedMarks = {};
  
        // Merge and average subtopics
        const allSubtopics = new Set([
          ...Object.keys(existingMarks),
          ...Object.keys(incomingSubtopicMarks)
        ]);
  
        for (let subtopic of allSubtopics) {
          const oldVal = existingMarks[subtopic] ?? null;
          const newVal = incomingSubtopicMarks[subtopic] ?? null;
  
          if (oldVal !== null && newVal !== null) {
            updatedMarks[subtopic] = (oldVal + newVal) / 2;
          } else {
            updatedMarks[subtopic] = newVal !== null ? newVal : oldVal;
          }
        }
  
        const totalMarks = average(Object.values(updatedMarks));
  
        student.interviewRecords[skillIndex].subtopicMarks = updatedMarks;
        student.interviewRecords[skillIndex].totalMarks = totalMarks;
      }
  
      await student.save();
      return res.status(200).json(new ApiResponse(200, student, "Skill data updated successfully."));
    } catch (error) {
      console.error(error);
      return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
  }
  async function getMarks(req, res) {
    try {
      const authId = req.user._id;
  
      // Fetch user
      const user = await User.findOne({ authId });
      if (!user) {
        return res.status(404).json(new ApiError(404, "User not found"));
      }
  
      // Await the student data
      const student = await StudentInterview.find({ studentId: user._id }).lean(); // Use .lean() to avoid circular refs
  
      if (!student || student.length === 0) {
        return res.status(200).json(new ApiResponse(200, {}, "No data available"));
      }
  
      return res.status(200).json(new ApiResponse(200, student, "Data fetched successfully"));
    } catch (error) {
      console.error(error);
      return res.status(500).json(new ApiError(500, "Internal Server Error"));
    }
  }
  

  export { setData };
export {getData,getMarks};