const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user"); // Adjust the path as needed
require("dotenv").config();
// Connect to MongoDB


// Function to seed the principal user
async function seedPrincipal() {
  try {
    // Check if the principal user already exists
    const existingPrincipal = await User.findOne({
      email: "principal@classroom.com",
    });

    if (!existingPrincipal) {
      const hashedPassword = await bcrypt.hash("Admin", 10);

      const principal = new User({
        name: "Principal",
        email: "principal@classroom.com",
        password: hashedPassword,
        role: "Principal",
      });
      const teacher = new User({
        name: "Teacher",
        email: "teacher@classroom.com",
        password: hashedPassword,
        role: "Teacher",
      });
      const student = new User({
        name: "Student",
        email: "student@classroom.com",
        password: hashedPassword,
        role: "Student",
      });

      await principal.save();
      await teacher.save();
      await student.save();

      console.log("Principal user seeded");
    } else {
      console.log("Principal user already exists");
    }
  } catch (err) {
    console.error("Error seeding principal:", err);
  }
}

// Export the database connection and seed function
module.exports = {
  connect: async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");

    // Seed the principal user after connecting to the database
    await seedPrincipal();
  },
};
