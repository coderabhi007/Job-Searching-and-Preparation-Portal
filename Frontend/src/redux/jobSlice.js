import { createSlice } from "@reduxjs/toolkit";

const dummyJobs = [
    {
      _id: "job1",
      title: "Frontend Developer",
      description: "Develop and maintain user-facing features using React.js.",
      requirements: [
        "Strong knowledge of JavaScript, HTML, and CSS",
        "Experience with React.js and Redux",
        "Familiarity with RESTful APIs"
      ],
      salary: 60000,
      experienceLevel: 2,
      location: "Pune, India",
      jobType: "Full-Time",
      position: 2,
      company: "65a1e0f1d3b2f33a5e123456",
      created_by: "65a1e0f1d3b2f33a5e654321",
      applications: []
    },
    {
      _id: "job2",
      title: "Backend Developer",
      description: "Build and maintain server-side applications using Node.js.",
      requirements: [
        "Proficient in Node.js and Express",
        "Experience with MongoDB and Mongoose",
        "Knowledge of RESTful API design"
      ],
      salary: 75000,
      experienceLevel: 3,
      location: "Mumbai, India",
      jobType: "Full-Time",
      position: 1,
      company: "65a1e0f1d3b2f33a5e223344",
      created_by: "65a1e0f1d3b2f33a5e998877",
      applications: []
    },
    {
      _id: "job3",
      title: "UI/UX Designer",
      description: "Design user-friendly interfaces and improve user experiences.",
      requirements: [
        "Proficiency in Figma or Adobe XD",
        "Strong understanding of user-centered design",
        "Ability to collaborate with developers"
      ],
      salary: 50000,
      experienceLevel: 1,
      location: "Remote",
      jobType: "Contract",
      position: 1,
      company: "65a1e0f1d3b2f33a5e334455",
      created_by: "65a1e0f1d3b2f33a5e112233",
      applications: []
    }
  ];
  

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:dummyJobs,
        allAdminJobs:[],
        singleJob:null, 
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
    },
    reducers:{
        // actions
        setAllJobs:(state,action) => {
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        }
    }
});
export const {
    setAllJobs, 
    setSingleJob, 
    setAllAdminJobs,
    setSearchJobByText, 
    setAllAppliedJobs,
    setSearchedQuery
} = jobSlice.actions;
export default jobSlice.reducer;