import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentDashboard = () => {
  const [classroom, setClassroom] = useState(null);
  const [students, setStudents] = useState([]);
  const [timetable, setTimetable] = useState([]);

  let id = localStorage.getItem("id");
  let AuthToken = localStorage.getItem("token");
  useEffect(() => {
    // Fetch the student's classroom, classmates, and timetable
    const fetchData = async () => {
      try {
        const classroomRes = await axios.get(
          `http://localhost:5000/api/classrooms-by-student/${id}`,
          {
            headers: {
              AuthToken,
            },
          }
        );
        // const studentsRes = await axios.get(
        //   `http://localhost:5000/api/classrooms/${classroomRes.data.id}/students`
        // );
        // const timetableRes = await axios.get(
        //   `http://localhost:5000/api/classrooms/${classroomRes.data.id}/timetable`
        // );
        setClassroom(classroomRes.data);
        // setStudents(studentsRes.data);
        // setTimetable(timetableRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      {classroom ? 
       classroom.map(ele=>{
        return (
          <>
            <h2 className="text-2xl m-4">Classroom: {ele.name}</h2>
            <div className="mt-6">
              <h2 className="text-2xl mb-4">Your Classmates</h2>
              <ul>
                {ele.studentsId.map((student) => (
                  <li key={student.id}>{student.name}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <h2 className="text-2xl mb-4">Your Timetable</h2>
              <ul>
                {ele.days.map((period) => (
                  <li key={period.id}>
                   Day : {period} start-Time :{ele.startTime} end-time: {ele.endTime}
                  </li>
                ))}
              </ul>
            </div>
          </>
        );
       }):<><h1>you have not assigned any classroom</h1></>
      }
    </div>
  );
};

export default StudentDashboard;
