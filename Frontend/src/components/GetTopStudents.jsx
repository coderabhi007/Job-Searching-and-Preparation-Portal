import React, { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import axiosInstance from '@/axios/axiosConfig';
import NavbarCompany from './shared/NavbarCompany';

const GetTopStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const requiredSkills = ["DSA"];
 /// const inputSkills = ["Python", "C++", "Java", "DSA", "JavaScript"];
 useEffect(() => {
  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.post('getTop', { requiredSkills });
      console.log(response);

      if (response.data.success) {
        setStudents(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchStudents();
}, []);


  

  const filteredStudents = students.filter(student =>
    requiredSkills.every(skill => inputSkills.includes(skill))
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
   <>
   <NavbarCompany/>
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <GraduationCap className="w-6 h-6 text-purple-600" />
        Top Students
      </h1>

      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStudents.map((student) => (
            <div key={student._id} className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-purple-700 capitalize">{student.name}</h2>
              <p className="text-gray-600">Score: {student.total_score.toFixed(2)}</p>
              <p className="text-gray-600">Email: {student.email}</p>
              <p className="text-gray-600">Contact: {student.contact}</p>
              <p className="text-gray-600">Address: {student.address}</p>
              <p className="text-gray-600">Skills: {student.skills.join(', ')}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No students match the required skills.</p>
      )}

      <div className="mt-8">
        <Link to="/" className="text-purple-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
   </>
  );
};

export default GetTopStudents;
