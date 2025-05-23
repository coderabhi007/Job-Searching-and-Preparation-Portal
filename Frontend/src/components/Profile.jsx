import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Mail, Pen, Phone, MapPin } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'

const Profile = () => {
    const [open, setOpen] = useState(false);
    const { data: user } = useSelector(store => store.auth);
    console.log("data",user);
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                                alt="profile"
                            />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.name || "Unknown User"}</h1>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>

                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email || "NA"}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Phone />
                        <span>{user?.contact || "NA"}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <MapPin />
                        <span>{user?.address || "NA"}</span>
                    </div>
                </div>

                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1 flex-wrap'>
                        {
                            user?.skills?.length > 0
                                ? user.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
                                : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Projects</h1>
                    <div className='flex items-center gap-1 flex-wrap'>
                        {
                            user?.projects?.length > 0
                                ? user.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
                                : <span>NA</span>
                        }
                    </div>
                </div>
            </div>

            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
