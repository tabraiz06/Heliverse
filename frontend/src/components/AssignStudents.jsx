import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignStudents = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);

  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedClassroom, setSelectedClassroom] = useState("");
  const [classroomId, setClassroomId] = useState("");

  const [selectedStudents, setSelectedStudents] = useState([]);

  const AuthToken = localStorage.getItem("token");
    const fetchData = async () => {
      const studentsResponse = await axios.get(
        "http://localhost:5000/api/auth/students",
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
      const classroomResponse = await axios.get(
        "http://localhost:5000/api/classrooms",
        {
          headers: {
            AuthToken,
          },
        }
      );
      setStudents(studentsResponse.data);
      setTeachers(teachersResponse.data);
      setClassrooms(classroomResponse.data);
    };

  useEffect(() => {
  
    fetchData();
  }, []);

  const handleStudentSelection = (studentId) => {
    setSelectedStudents((prevStudents) =>
      prevStudents.includes(studentId)
        ? prevStudents.filter((id) => id !== studentId)
        : [...prevStudents, studentId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/${classroomId}/students`,
        {
          teacherId: selectedTeacher,
          studentId: selectedStudents,
        },
        {
          headers: {
            AuthToken,
          },
        }
      );
      alert("Students assigned to teacher successfully!");
      fetchData()
    } catch (error) {
      console.error("Error assigning students:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700">Select ClassRoom</label>
        <select
          value={selectedClassroom}
          onChange={(e) => [
            setSelectedClassroom(e.target.value),
            setClassroomId(e.target.value),
          ]}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select a Classroom</option>
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
      <div className="mb-4">
        <label className="block text-gray-700">Select Students</label>
        <div className="mt-2">
          {students.map((student) => (
            <label key={student._id} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                checked={selectedStudents.includes(student._id)}
                onChange={() => handleStudentSelection(student._id)}
                className="form-checkbox"
              />
              <span className="ml-2">{student.name}</span>
            </label>
          ))}
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Assign Students
      </button>
    </form>
  );
};

export default AssignStudents;
