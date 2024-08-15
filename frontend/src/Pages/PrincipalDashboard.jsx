import React, { useState, useEffect } from "react";
import ClassroomForm from "../components/ClassroomForm";
import AssignTeacher from "../components/AssignTeacher";
import AssignStudents from "../components/AssignStudents";
import axios from "axios";
import AddUserForm from "../components/AddUser";

const PrincipalDashboard = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch classrooms, teachers, and students from the backend
    const fetchData = async () => {
      try {
        const [classroomsRes, teachersRes, studentsRes] = await Promise.all([
          axios.get("/api/classrooms"),
          axios.get("/api/teachers"),
          axios.get("/api/students"),
        ]);
        setClassrooms(classroomsRes.data);
        setTeachers(teachersRes.data);
        setStudents(studentsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleCreateClassroom = async (classroomData) => {
    try {
      const res = await axios.post("/api/classrooms", classroomData);
      setClassrooms([...classrooms, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignTeacher = async (classroomId, teacherId) => {
    try {
      await axios.post(`/api/classrooms/${classroomId}/assign-teacher`, {
        teacherId,
      });
      // Update the UI if necessary
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignStudents = async (teacherId, studentIds) => {
    try {
      await axios.post(
        `http://localhost:5000/api/teachers/${teacherId}/assign-students`,
        {
          studentIds,
        }
      );
      // Update the UI if necessary
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Principal Dashboard</h1>
      <ClassroomForm />
      <AddUserForm />
      <AssignTeacher />
      <AssignStudents />
    </div>
  );
};

export default PrincipalDashboard;
