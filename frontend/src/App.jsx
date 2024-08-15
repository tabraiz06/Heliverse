import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrincipalDashboard from "./pages/PrincipalDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Login from "./pages/Login";
import Logout from "./components/Logout";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" exact element={<Login/>} />
            <Route path="/logout" exact element={<Logout/>} />
            <Route path="/principal-dashboard" element={<PrincipalDashboard/>} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard/>} />
            <Route path="/student-dashboard" element={<StudentDashboard/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
