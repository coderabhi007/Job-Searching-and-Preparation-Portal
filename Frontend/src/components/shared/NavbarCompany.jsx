import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { Logout } from '@/axios/api/auth.api';

const NavbarCompany = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {

        //const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
        const res = await Logout();
        console.log(res);
        if (res.success) {
            dispatch(setUser(null));
            navigate("/");
            toast.success(res.message);
        }
        else {
            if (res.statusCode == 401)
                dispatch(setUser(null));
            else
                toast.error(res.message || "Invalid email");
        }

    }
    return (
        <>


            <div className='bg-white'>
                <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                    <div>
                        <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                    </div>
                    <div className='flex items-center gap-12'>
                        <ul className='flex font-medium items-center gap-5'>



                            <li><Link to="/company/post">Post Job</Link></li>
                            <li><Link to="/company/getAlljob">See Your Posted Jobs</Link></li>





                        </ul>
                        {
                            !user ? (
                                <div className='flex items-center gap-2'>
                                    <Link to="/login"><Button variant="outline">Login</Button></Link>
                                    <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer bg-gray-600">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className=' p-4 rounded'>
                                            <div className='flex gap-3 items-center'>
                                                <div>
                                                    <h4 className='font-medium'>{user?.fullname}</h4>
                                                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                                    <Button variant="link" className="p-0 h-auto mt-1">
                                                        <Link to="/companyProfile">View Profile</Link>
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className='flex flex-col mt-4 text-gray-600'>
                                                <div className='flex items-center gap-2 cursor-pointer'>
                                                    <LogOut />
                                                    <Button onClick={logoutHandler} variant="link" className="p-0 h-auto">
                                                        Logout
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>

                            )
                        }

                    </div>
                </div>

            </div>
        </>
    )
}

export default NavbarCompany