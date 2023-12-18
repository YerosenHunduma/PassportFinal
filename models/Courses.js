const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: String,
  courseCode: String,
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = { Course };
