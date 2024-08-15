import React, { useState } from "react";
import axios from "axios";

const ClassroomForm = () => {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [days, setDays] = useState([]);

  const handleDayChange = (day) => {
    setDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };
  const AuthToken = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const classroomData = { name, startTime, endTime, days };
    try {
      await axios.post("http://localhost:5000/api/classroom", classroomData, {
        headers: {
          AuthToken,
        },
      });
      alert("Classroom created successfully!");
    } catch (error) {
      console.error("Error creating classroom:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700">Classroom Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">End Time</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Days of the Week</label>
        <div className="mt-2">
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].map((day) => (
            <label key={day} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                checked={days.includes(day)}
                onChange={() => handleDayChange(day)}
                className="form-checkbox"
              />
              <span className="ml-2">{day}</span>
            </label>
          ))}
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create Classroom
      </button>
    </form>
  );
};

export default ClassroomForm;
