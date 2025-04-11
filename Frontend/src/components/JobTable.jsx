import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import NavbarCompany from './shared/NavbarCompany';
import axiosInstance from '@/axios/axiosConfig';
import { AppliedUsers } from '@/axios/api/company.api';

const JobTable = () => {
    const [users, setUsers] = useState([]);
    const { jobId } = useParams();
    console.log("jobId", jobId);
    useEffect(() => {
        const fetchProfiles = async () => {
            try {

                const res = await AppliedUsers(jobId);
                console.log("res.data",res)
                setUsers(res.data);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };
        fetchProfiles();
    }, []);

    if (!users || users.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-10 text-center">
                <h2 className="text-xl font-semibold text-gray-700">No users have applied for this job yet.</h2>
            </div>
        );
    }
    
    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">User Profiles</h2>
            <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2">Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Passout</th>
                        <th>Experience</th>
                        <th>Skills</th>
                        <th>GitHub</th>
                        <th>Portfolio</th>
                        <th>Projects</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u, idx) => (
                        <tr key={idx} className="border-t">
                            <td className="p-2">{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.contact}</td>
                            <td>{u.passoutYear}</td>



                            <td>{u.experience} yrs</td>
                            <td>{u.skills?.join(', ')}</td>
                            <td>{u.description}</td>
                            <td><a href={u.githubProfile} target="_blank" rel="noreferrer">GitHub</a></td>
                            <td><a href={u.leetcodeProfile} target="_blank" rel="noreferrer">LeetCode</a></td>
                            <td><a href={u.portfolioUrl} target="_blank" rel="noreferrer">Portfolio</a></td>
                            <td>
                                {u.profileImage && (
                                    <img src={u.profileImage} alt="profile" className="w-10 h-10 rounded-full" />
                                )}
                            </td>
                            <td>
                                {u.projects?.map((p, i) => (
                                    <div key={i} className="mb-2">
                                        <strong>{p.title}</strong>
                                        <div>{p.description}</div>
                                        <a href={p.link} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">Live</a> |{' '}
                                        <a href={p.githubLink} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">Code</a>
                                        <div>Tech: {p.techStack?.join(', ')}</div>
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobTable;



