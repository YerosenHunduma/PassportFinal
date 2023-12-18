const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;
const ObjectId = Types.ObjectId;

const StudentCourseSchema = new Schema({
  user: { type: ObjectId, ref: "User" },
  courses: [
    {
      course: { type: ObjectId, ref: "Course" },
      grade: { type: String, default: "N/G" },
    },
  ],
});

const StudentCourse = model("StudentCourse", StudentCourseSchema);

module.exports = { StudentCourse };
