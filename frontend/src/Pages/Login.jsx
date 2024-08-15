import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { isCancel, AxiosError } from "axios";

const Login = () => {
  const [email, setEmail] = useState("principal@classroom.com");
  const [password, setPassword] = useState("Admin");
  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/principal", {
        email,
        password,
      });
      
      localStorage.setItem("token", res.data.auth_token);
      localStorage.setItem("id", res.data.id);
      localStorage.setItem("role", res.data.role);
     if(res.data.role === "Principal"){
       history("/principal-dashboard");
     }
    else if(res.data.role === "Teacher"){
       history("/teacher-dashboard");
     }
    else if(res.data.role === "Student"){
       history("/student-dashboard");
     }
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-10 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Login as Principal
      </h1>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>

      <div className="m-4 flex flex-col">
        <h1 className="text-xl font-bold">to get the techer or student dashboard use these</h1>
        <div className="flex flex-col">
          <h1>detail to login as a teacher</h1>
          <span>teacher@classroom.com</span>
          <span>Admin</span>
        </div>
        <div className="flex flex-col">
          <h1>detail to login as a student</h1>
          <span>student@classroom.com</span>
          <span>Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
