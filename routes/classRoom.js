const express = require("express");
const auth = require("../middleware/auth");
const Classroom = require("../models/classroomModel");
const User = require("../models/user");
const router = express.Router();

// POST api/classrooms - Create a Classroom (Principal)

router.post("/classroom", auth, async (req, res) => {
  const { name, startTime, endTime, days } = req.body;
  

  try {
    const classroom = new Classroom({
      name,
      startTime,
      endTime,
      days,
    });

    await classroom.save();

    res.json(classroom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// POST api/classrooms/:id/students - Assign Students to Classroom (Principal)
router.post("/:id/students", auth, async (req, res) => {
  
  try {
    const classroom = await Classroom.findById(req.params.id);
    const students = await User.find({
      _id: { $in: req.body.studentId },
      role: "Student",
    });
    classroom.teacherId = req.body.teacherId;
    classroom.studentsId.push(...students.map((student) => student.id));
    await classroom.save();

    students.forEach(async (student) => {
      student.classroom = classroom.id;
      await student.save();
    });

    res.json(classroom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Assign a teacher to a classroom
router.patch("/:id/assign-teacher", async (req, res) => {
  const { teacherId } = req.body;

  try {
    // Ensure the teacher exists and is indeed a teacher
    const teacher = await User.findOne({ _id: teacherId, role: "Teacher" });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Find the classroom and update it with the teacher's ID
    const classroom = await Classroom.findByIdAndUpdate(
      req.params.id,
      { teacherId },
      { new: true, runValidators: true }
    );

    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    res.status(200).json({
      message: "Teacher assigned to classroom successfully",
      classroom,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// GET api/classrooms - Get All Classrooms (Principal)
// need to add auth
router.get("/classrooms", auth, async (req, res) => {
  try {
    
    const classrooms = await Classroom.find().populate("teacherId studentsId");
    res.json(classrooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// API to get classrooms assigned to a specific teacher
router.get("/classrooms-by-teacher/:teacherId", async (req, res) => {
  try {
    const { teacherId } = req.params;

    // Find classrooms assigned to the teacher
    const classrooms = await Classroom.find({ teacherId }).populate(
      "studentsId teacherId",
      "-password"
    );

    if (!classrooms.length) {
      return res
        .status(404)
        .json({ message: "No classrooms found for this teacher" });
    }

    res.status(200).json(classrooms);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// API to get classrooms assigned to a specific student
router.get("/classrooms-by-student/:studentsId", async (req, res) => {
  try {
    const { studentsId } = req.params;

    // Find classrooms assigned to the teacher
    const classrooms = await Classroom.find({ studentsId }).populate(
      "studentsId teacherId",
      "-password"
    );

    if (!classrooms.length) {
      return res
        .status(404)
        .json({ message: "No classrooms found for this teacher" });
    }

    res.status(200).json(classrooms);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
