const { StudentCourse } = require("../models/StudentCourses");

const studentsEnrollment = async (req, res, next) => {
  const user = req.user;
  const role = req.user.role;
  const { _id } = req.user;

  const enrolledCourses = await StudentCourse.find({ user: _id })
    .populate("courses.course")
    .select("courses");

  console.log("enrolledCourses", enrolledCourses);

  const studentsByCourse = [];

  for (const enrolledCourse of enrolledCourses) {
    for (const course of enrolledCourse.courses) {
      const { _id, title } = course.course;
      const courseId = _id;
      const courseTitle = title;

      const enrolledStudents = await StudentCourse.find({
        "courses.course": courseId,
        user: { $ne: req.user._id },
      }).populate("user");

      studentsByCourse.push({
        courseId,
        courseTitle,
        students: enrolledStudents,
      });
    }
  }

  // Log detailed information about students, courses, and grades to the console
  // studentsByCourse.forEach((course) => {
  //   course.students.forEach((student) => {
  //     console.log(`Student Username: ${student.user.username}`);
  //     student.courses.forEach((courseEnrollment) => {
  //       console.log(`Course ID: ${courseEnrollment.course}`);
  //       console.log(`Grade: ${courseEnrollment.grade}`);
  //     });
  //   });
  // });

  res.render("manageStudents", { user, role, studentsByCourse });
};

const grade = async (req, res, next) => {
  try {
    console.log(req.body);
    const { userId, courseId, grade } = req.body;

    const updatedStudentCourse = await StudentCourse.findOneAndUpdate(
      {
        user: userId,
        "courses.course": courseId,
      },
      { $set: { "courses.$.grade": grade } },
      { new: true }
    );

    console.log("Updated Student Course:", updatedStudentCourse);

    res.redirect("/api/instructor/Instructor/studentList");
  } catch (error) {
    next(error);
  }
};

module.exports = { studentsEnrollment, grade };
