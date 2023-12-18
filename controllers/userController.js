const { StudentCourse } = require("../models/StudentCourses");

const profile = async (req, res) => {
  const { _id } = req.user;
  const user = req.user;
  const role = req.user.role;

  try {
    const enrolledCourses = await StudentCourse.find({ user: _id })
      .populate("courses.course")
      .exec();

    console.log(enrolledCourses);

    const courseDetails = enrolledCourses.flatMap((enrollment) =>
      enrollment.courses.map((course) => ({
        courseId: course.course._id,
        courseName: course.course.title,
        courseCode: course.course.courseCode,
        grade: course.grade,
      }))
    );

    console.log(courseDetails);
    res.render("profile", { user, role, courseDetails });
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

const home = (req, res) => {
  const token = req.cookies.token;
  console.log("Received Token:", token);
  const userName = req.user ? req.user.name || req.user.username : null;
  res.locals.user = userName;
  const role = req.user.role;
  res.render("home.ejs", { userName, role });
};

module.exports = { home, profile };
