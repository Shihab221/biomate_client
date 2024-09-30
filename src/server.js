const express = require("express");
const mongoose = require("mongoose");
const Course = require("./models/Course");
const config = require("./config");

const app = express();
const port = config.port;

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("https://biomate-server-49d3.vercel.app/api/courses", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
