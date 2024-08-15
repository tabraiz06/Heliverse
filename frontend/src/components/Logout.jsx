import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from localStorage or cookies
    localStorage.removeItem("token"); // or sessionStorage, or any other storage method used
    // Navigate to the login page
    navigate("/");
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-2xl font-bold">Logging out...</h2>
    </div>
  );
};

export default Logout;
