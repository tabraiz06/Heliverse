import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignTeacher = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState("");
  const [selectedClassroomId, setSelectedClassroomId] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const AuthToken = localStorage.getItem("token");
 const fetchData = async () => {
   const classroomsResponse = await axios.get(
     "http://localhost:5000/api/classrooms",
     {
       headers: {
         AuthToken,
       },
     }
   );
   const teachersResponse = await axios.get(
     "http://localhost:5000/api/auth/teachers",
     {
       headers: {
         AuthToken,
       },
     }
   );
   setClassrooms(classroomsResponse.data);
   setTeachers(teachersResponse.data);
 };
  useEffect(() => {
   
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/api/${selectedClassroomId}/assign-teacher`,
        {
          teacherId: selectedTeacher,
        },
        {
          headers: {
            AuthToken,
          },
        }
      );
      alert("Teacher assigned to classroom successfully!");
      fetchData()
    } catch (error) {
      console.error("Error assigning teacher:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700">Select Classroom</label>
        <select
          value={selectedClassroom}
          onChange={(e) => [
            setSelectedClassroom(e.target.value),
            setSelectedClassroomId(e.target.value),
          ]}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select a classroom</option>
          {classrooms.map((classroom) => (
            <option key={classroom._id} value={classroom._id}>
              {classroom.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Select Teacher</label>
        <select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select a teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Assign Teacher
      </button>
    </form>
  );
};

export default AssignTeacher;
