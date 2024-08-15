const mongoose = require("mongoose");

const ClassroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  days: { type: [String], required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  studentsId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Classroom", ClassroomSchema);
