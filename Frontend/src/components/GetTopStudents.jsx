import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import axiosInstance from '@/axios/axiosConfig';
import NavbarCompany from './shared/NavbarCompany';

const GetTopStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  
  const skills = ["Python", "C++", "Java", "JavaScript", "DSA"];

  // Handle skill selection (checkbox)
  const handleSkillChange = (event) => {
    const { value, checked } = event.target;
    setSelectedSkills((prevSelectedSkills) => {
      if (checked) {
        return [...prevSelectedSkills, value];  // Add the selected skill
      } else {
        return prevSelectedSkills.filter(skill => skill !== value);  // Remove unselected skill
      }
    });
  };

  // Function to fetch top students based on selected skills
  const fetchStudents = async () => {
    if (selectedSkills.length === 0) {
      alert('Please select at least one skill!');
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post('getTopRankedStudents', {
        requiredSkills: selectedSkills
      });
      console.log("Response data:", response); // Log the full response

      if (response.data.success) {
        console.log("Students data:", response.data.data); // Log the students data
        setStudents(response.data.data); // Set students data
      } else {
        console.error('Error: Data fetch unsuccessful');
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarCompany />
      <div className="min-h-screen p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-purple-600" />
          Top Students
        </h1>

        {/* Skill Selection (Checkboxes) */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-700">Select Skills</h2>
          <div className="mt-4">
            {skills.map((skill) => (
              <div key={skill} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={skill}
                  value={skill}
                  checked={selectedSkills.includes(skill)}
                  onChange={handleSkillChange}
                  className="mr-2"
                />
                <label htmlFor={skill} className="text-gray-700">{skill}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={fetchStudents}
          className="mt-4 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Submit
        </button>

        {loading && <div className="mt-4">Loading...</div>}

        {/* Students Data */}
        {students.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {students.map((student) => (
              <div key={student._id} className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <h2 className="text-xl font-semibold text-purple-700 capitalize">{student.name}</h2>
                <p className="text-gray-600">Score: {student.total_score ? student.total_score.toFixed(2) : 'N/A'}</p>
                <p className="text-gray-600">Email: {student.email}</p>
                <p className="text-gray-600">Contact: {student.contact}</p>
                <p className="text-gray-600">Address: {student.address}</p>
                <p className="text-gray-600">Skills: {student.skills ? student.skills.join(', ') : 'No skills listed'}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-4">No students available.</p>
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
