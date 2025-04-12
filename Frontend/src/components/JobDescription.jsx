// import React, { useEffect, useState } from 'react'
// import { Badge } from './ui/badge'
// import { Button } from './ui/button'
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
// import { setSingleJob } from '@/redux/jobSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'sonner';

// const JobDescription = () => {
//     const {singleJob} = useSelector(store => store.job);
//     const {user} = useSelector(store=>store.auth);
//     const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
//     const [isApplied, setIsApplied] = useState(isIntiallyApplied);

//     const params = useParams();
//     const jobId = params.id;
//     const dispatch = useDispatch();

//     const applyJobHandler = async () => {
//         try {
//             const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
//             if(res.data.success){
//                 setIsApplied(true); // Update the local state
//                 const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
//                 dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
//                 toast.success(res.data.message);

//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         }
//     }

//     useEffect(()=>{
//         const fetchSingleJob = async () => {
//             try {
//                 const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
//                 if(res.data.success){
//                     dispatch(setSingleJob(res.data.job));
//                     setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchSingleJob(); 
//     },[jobId,dispatch, user?._id]);

//     return (
//         <div className='max-w-7xl mx-auto my-10'>
//             <div className='flex items-center justify-between'>
//                 <div>
//                     <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
//                     <div className='flex items-center gap-2 mt-4'>
//                         <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.postion} Positions</Badge>
//                         <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
//                         <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
//                     </div>
//                 </div>
//                 <Button
//                 onClick={isApplied ? null : applyJobHandler}
//                     disabled={isApplied}
//                     className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
//                     {isApplied ? 'Already Applied' : 'Apply Now'}
//                 </Button>
//             </div>
//             <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
//             <div className='my-4'>
//                 <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
//                 <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
//                 <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
//                 <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
//                 <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
//                 <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
//                 <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
//             </div>
//         </div>
//     )
// }

// export default JobDescription


import React, { useEffect, useState } from 'react'
import { Navigate,useNavigate, useParams } from 'react-router-dom'
import { Button } from './ui/button'
import { Dialog, DialogTrigger, DialogContent } from './ui/dialog'
import { Label } from './ui/label'
import { toast } from 'sonner'
import axiosInstance from '@/axios/axiosConfig'
import { Input } from './ui/input'
import { setJobId } from '@/redux/authSlice';
import { useDispatch } from 'react-redux'
import Loader from './ui/Loader'


const JobDescription = () => {
    //const { jobId } = useParams();
    const params = useParams();
    const jobId = params.id;
    const [job, setJob] = useState(null)
    const [editJob, setEditJob] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    console.log(jobId);
    const navigate = useNavigate();
    // Fetch job data by ID
    useEffect(() => {
        if (!jobId) return
        const fetchJob = async () => {
            dispatch(setJobId(jobId));
            try {
                const res = await axiosInstance.get(`job/getJobById/${jobId}`)
                setJob(res.data.data)
                console.log(res);
                
                setEditJob(res.data.data) // Create editable state
            } catch (err) {
                toast.error('Error fetching job')
                console.error(err)
            }
        }
        fetchJob()
    }, [jobId])

    const handleChange = (e) => {
        const { name, value } = e.target
        setEditJob(prev => ({ ...prev, [name]: value }))
    }
    async function handleApply(){
        try {
            const res=await axiosInstance.post(`job/apply/${jobId}`)
            toast.success("job applies succesfully")
            window.location.reload();
        } catch (error) {
            console.error(error)
            toast.error(error?.response?.data?.message || 'Update failed')
        }
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axiosInstance.put(`job/update/${jobId}`, editJob)
            toast.success('Job updated successfully!')
            setJob(editJob) // Update the displayed info
        } catch (err) {
            console.error(err)
            toast.error(err?.response?.data?.message || 'Update failed')
        } finally {
            setLoading(false)
        }
    }
       useEffect(() => {
                const timer = setTimeout(() => {
                    handleUpdate();
                }, 0);
        
                // Optional cleanup
                return () => clearTimeout(timer);
            }, []);
    if (!job) {
        return (
            <div className="relative w-screen h-screen">
            <Loader/>
          </div>
        );
      }

    // if (!job) return <p className="text-center my-10">Loading...</p>

    return (
        <div className="max-w-4xl mx-auto my-10 bg-white p-6 rounded-lg shadow border">
            <h1 className="text-2xl font-bold mb-4">{job.JobTitle}</h1>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div><strong>Company:</strong> {job.companyName}</div>
                <div><strong>Experience:</strong> {job.experience}</div>
                <div><strong>CTC:</strong> {job.ctc}</div>
                <div><strong>Type:</strong> {job.jobType}</div>
                <div><strong>Open Positions:</strong> {job.position}</div>
                <div><strong>Deadline:</strong> {job.deadline?.slice(0, 10)}</div>
                <div className="col-span-2"><strong>Eligibility:</strong> {job.eligibilityCriteria}</div>
                <div className="col-span-2"><strong>Description:</strong> {job.description}</div>
                <div className="col-span-2"><strong>Responsibilities:</strong> {job.responsibilities}</div>
                <div><strong>Skills:</strong> {job.skillsRequired?.join(', ')}</div>
                <div><strong>Locations:</strong> {job.location?.join(', ')}</div>
            </div>

            <div className="mt-6">
                <Dialog>
                    <div className='flex flex-row space-x-5'>


                        {/* <DialogTrigger asChild>
                            <Button>Edit Job</Button>
                        </DialogTrigger> */}
                       
                        {/* <Button onClick={() => navigate(`/jobTable/${jobId}`)}>Applied Candidates</Button> */}


                        <Button
                        disabled={job.applied} 
                        onClick={handleApply}
                        
                        >Easy Apply</Button>



                    </div>
                    <DialogContent className="max-w-3xl p-6 h-4/5 overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Edit Job</h2>
                        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Job Title</Label>
                                <Input name="JobTitle" value={editJob.JobTitle} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Experience</Label>
                                <Input name="experience" value={editJob.experience} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>CTC</Label>
                                <Input name="ctc" value={editJob.ctc} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Job Type</Label>
                                <Input name="jobType" value={editJob.jobType} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Open Positions</Label>
                                <Input name="position" type="number" value={editJob.position} onChange={handleChange} />
                            </div>
                            <div>
                                <Label>Deadline</Label>
                                <Input type="date" name="deadline" value={editJob.deadline?.slice(0, 10)} onChange={handleChange} />
                            </div>
                            <div className="col-span-2">
                                <Label>Eligibility Criteria</Label>
                                <Input name="eligibilityCriteria" value={editJob.eligibilityCriteria} onChange={handleChange} />
                            </div>
                            <div className="col-span-2">
                                <Label>Description</Label>
                                <Input name="responsibilities" value={editJob.description} onChange={handleChange} />
                            </div>
                            <div className="col-span-2">
                                <Label>Responsibilities</Label>
                                <Input name="responsibilities" value={editJob.responsibilities} onChange={handleChange} />
                            </div>
                            <div className="col-span-2">
                                <Label>Skills Required (comma separated)</Label>
                                <Input
                                    name="skillsRequired"
                                    value={editJob.skillsRequired.join(', ')}
                                    onChange={(e) =>
                                        setEditJob(prev => ({
                                            ...prev,
                                            skillsRequired: e.target.value.split(',').map(s => s.trim()),
                                        }))
                                    }
                                />
                            </div>
                            <div className="col-span-2">
                                <Label>Locations (comma separated)</Label>
                                <Input
                                    name="location"
                                    value={editJob.location.join(', ')}
                                    onChange={(e) =>
                                        setEditJob(prev => ({
                                            ...prev,
                                            location: e.target.value.split(',').map(l => l.trim()),
                                        }))
                                    }
                                />
                            </div>
                            <div className="col-span-2 mt-4">
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? 'Updating...' : 'Update Job'}
                                </Button>

                            </div>
                        </form>
                    </DialogContent>

                </Dialog>
            </div>
        </div>
    )
}

export default JobDescription
