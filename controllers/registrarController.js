const { User } = require("../models/User");
const { Course } = require("../models/Courses");
const { StudentCourse } = require("../models/StudentCourses");
const manageStudent = async (req, res, next) => {
  try {
    const users = await User.find({ role: { $in: ["STUDENT", "INSTRUCTOR"] } });
    const role = req.user.role;
    console.log(users);

    res.render("manageUsers", { users, role });
  } catch (error) {
    next(error);
  }
};

const user = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const courses = await Course.find();
    const role = req.user.role;

    const enrolledCourses = await StudentCourse.find({ user: id })
      .populate("courses.course")
      .exec();

    const courseDetails = enrolledCourses
      .map((studentCourse) => {
        const coursesInfo = studentCourse.courses.map((enrollment) => ({
          courseId: enrollment.course._id,
          courseName: enrollment.course.title,
          courseCode: enrollment.course.courseCode,
          grade: enrollment.grade,
        }));
        return coursesInfo;
      })
      .flat();

    console.log("enrolled to", courseDetails);
    res.render("enroll", { user, courses, role, courseDetails });
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const { id, role } = req.body;
    // console.log(id);
    // if (req.user.id === id) {
    //   return res.redirect("/api/users/registrar");
    // }

    await User.findByIdAndUpdate(
      id,
      { role: role },
      { new: true, runValidators: true }
    );

    res.redirect("/api/registrar/registrar");
  } catch (error) {
    next(error);
  }
};

const updateInfoForm = async (req, res, next) => {
  const userId = req.params.id;

  const courses = await Course.find;
  const user = await User.findById(userId);
  console.log("id", user);
  const role = req.user.role;
  res.render("editUserInfo", { user, courses, role });
};

const updateUserInfo = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;

    console.log(req.body);

    const user = await User.findById(userId);

    user.set({
      ...user.toObject(),
      username: username || user.username,
      email: email || user.email,
    });

    await user.save();
    res.redirect(`/api/registrar/registrar/user/${userId}`);
  } catch (error) {
    next(error);
  }
};

const userEnrolledCourses = async (req, res, next) => {
  const { userid } = req.params;

  try {
    const enrolledCourses = await StudentCourse.find({ user: userid })
      .populate("course")
      .exec();
    console.log("enrolled to", enrolledCourses);
  } catch (error) {}
};

module.exports = {
  manageStudent,
  user,
  updateRole,
  updateUserInfo,
  updateInfoForm,
  userEnrolledCourses,
};
