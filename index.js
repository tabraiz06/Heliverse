const express = require("express");
const db = require("./config/db"); 
require("dotenv").config();
const userRoute = require("./routes/auth");
const classroomRoute = require("./routes/classRoom");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
// Middleware and routes setup here
app.use(express.json());
app.use(cors());

// Define Routes
app.use("/api/auth", userRoute);
app.use("/api", classroomRoute);

// Connect to the database and seed principal user
db.connect()
  .then(() => {
    // Start the server only after the database connection is established
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
