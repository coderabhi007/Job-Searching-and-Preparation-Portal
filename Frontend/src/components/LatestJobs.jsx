import React, { useEffect, useState } from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import { Allposts } from '@/axios/api/job.api';
import JobCardShimmer from './JobCardShimmer';

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const [allJobs,setAlljobs]=useState([]);
    const AddJob = async () => {
        try {
            const response = await Allposts();
            console.log("response", response);
            //dispatch(setAllJobs(response?.data?.data));
            console.log("response?.data?.data",response?.data?.data);
            setAlljobs(response?.data?.data);
        } catch (err) {
            console.error('Company Update Error:', err)
        }
    }

    useEffect(()=>{
        AddJob();
    },[])

    // if(allJobs.length===0){
    //     return <JobCardShimmer/>
    // }


   
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs == 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job?.jobId} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs