import React, { useState, useEffect } from "react";
// import TimetableForm from "../components/TimetableForm";
import axios from "axios";
import AssignStudents from "../components/AssignStudents";

const TeacherDashboard = () => {
  const [classroom, setClassroom] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedClassroom, setSelectedClassroom] = useState("");
  const [classroomId, setClassroomId] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  let AuthToken = localStorage.getItem("token");
  let id = localStorage.getItem("id");
  const fetchData = async () => {
    try {
      const classroomRes = await axios.get(
        `http://localhost:5000/api/classrooms-by-teacher/${id}`,
        {
          headers: {
            AuthToken,
          },
        }
      );
      const studentsRes = await axios.get(
        `http://localhost:5000/api/auth/students`,
        {
          headers: {
            AuthToken,
          },
        }
      );
      setClassroom(classroomRes.data);
      setStudents(studentsRes.data);
    } catch (err) {
      console.error(err);
    }
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
          teacherId: id,
          studentId: selectedStudents,
        },
        {
          headers: {
            AuthToken,
          },
        }
      );
      alert("Students assigned successfully!");
      fetchData();
    } catch (error) {
      console.error("Error assigning students:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
      {classroom &&
        classroom.map((ele) => {
          return (
            <>
              <h2 className="text-2xl mb-4">Classroom: {ele.name}</h2>
              {/* <TimetableForm onSubmit={handleCreateTimetable} /> */}
              <div className="mt-6">
                <h2 className="text-2xl mb-4">Students in Your Classroom</h2>
                <ul>
                  {ele.studentsId.map((student) => (
                    <li key={student.id}>{student.name}</li>
                  ))}
                </ul>
              </div>
            </>
          );
        })}
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
            {classroom.map((classroom) => (
              <option key={classroom._id} value={classroom._id}>
                {classroom.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Select Students</label>
          <div className="mt-2">
            {students.map((student) => (
              <label
                key={student._id}
                className="inline-flex items-center mr-4"
              >
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
    </div>
  );
};

export default TeacherDashboard;
