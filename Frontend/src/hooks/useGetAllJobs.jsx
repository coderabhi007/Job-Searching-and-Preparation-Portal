import { setAllJobs } from '@/redux/jobSlice'
import store from '@/redux/store'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
   
const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    dispatch(setAllJobs(dummyJobs));
    // useEffect(()=>{
    //     const fetchAllJobs = async () => {
    //         try {
    //             const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
    //             if(res.data.success){
    //                 dispatch(setAllJobs(res.data.jobs));
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchAllJobs();
    // },[])
}

export default useGetAllJobs

