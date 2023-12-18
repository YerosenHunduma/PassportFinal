const { Course } = require("../models/Courses");
const { User } = require("../models/User");
const { StudentCourse } = require("../models/StudentCourses");

const AddCourses = async (req, res, next) => {
  const { title, courseCode } = req.body;

  try {
    const existingCourse = await Course.findOne({
      $or: [{ title: title }, { courseCode: courseCode }],
    });
    const courses = await Course.find();

    if (existingCourse) {
      const errorMessage = "Course title or course code already exists.";
      return res.render("addCourses", {
        error: errorMessage,
        courses,
      });
    }

    const newCourse = new Course({
      title: title,
      courseCode: courseCode,
    });

    await newCourse.save();
    res.redirect("/api/registrar/courses/add_Courses");
  } catch (error) {
    console.error("Error adding course:", error);
    const errorMessage = "Internal Server Error";
    res.render("addCourses", { error: errorMessage });
  }
};

const addCoursesForm = async (req, res, next) => {
  const courses = await Course.find();
  const user = req.user;
  const role = req.user.role;
  res.render("addCourses", { user, courses, role });
};

const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    const role = req.user.role;
    console.log("courses", courses);

    res.render("courses", { courses, role });
  } catch (error) {
    next(error);
  }
};

const updateCourses = async (req, res, next) => {
  try {
    console.log(req.body);
    const courseId = req.params.id;
    console.log(courseId);
    const { title, courseCode } = req.body;

    const course = await Course.findById(courseId);

    course.set({
      ...course.toObject(),
      title: title || course.title,
      courseCode: courseCode || course.courseCode,
    });

    await course.save();

    res.redirect("/api/registrar/courses/add_Courses");
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const courseId = req.body.courseId;

    const course = await Course.findById(courseId);
    console.log(course);

    await StudentCourse.updateMany(
      {},
      { $pull: { courses: { course: courseId } } }
    );

    await Course.deleteOne({ _id: courseId });

    res.redirect("/api/registrar/courses/add_Courses");
  } catch (error) {
    next(error);
  }
};

const enrollCourses = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const selectedCourseIds = req.body.courses;

    const user = await User.findById(userId);

    if (!user) {
      console.error("User not found.");
      const errorMessage = "User not found.";
      res.render(`enroll`, { error: errorMessage });
    }

    const courses = await Course.find({ _id: { $in: selectedCourseIds } });

    if (courses.length !== selectedCourseIds.length) {
      console.error("One or more courses not found.");
      const errorMessage = "One or more courses not found.";
      res.render(`enroll`, { error: errorMessage });
    }

    let studentCourse = await StudentCourse.findOne({ user: userId });

    if (!studentCourse) {
      studentCourse = new StudentCourse({
        user: userId,
        courses: [],
      });
    }

    selectedCourseIds.forEach((courseId) => {
      const existingCourse = studentCourse.courses.find(
        (course) => course.course.toString() === courseId.toString()
      );

      if (!existingCourse) {
        studentCourse.courses.push({
          course: courseId,
          grade: "N/G",
        });
      } else {
        const errorMessage = `User is already enrolled in the course with ID ${courseId}.`;
        return res.render(`enroll`, { error: errorMessage });
      }
    });

    await studentCourse.save();

    res.redirect(`/api/registrar/registrar/user/${userId}`);
  } catch (error) {
    console.error(error);
  }
};

const revokeCourses = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const courseId = req.body.courseId;
    console.log(req.body);
    console.log(courseId);

    await StudentCourse.updateOne(
      { user: userId },
      { $pull: { courses: { course: courseId } } }
    );

    res.redirect(`/api/registrar/registrar/user/${userId}`);
  } catch (error) {
    console.error(error);
  }
};

const course = async (req, res, next) => {
  try {
    const user = req.user;
    const role = req.user.role;
    const { id } = req.params;
    const course = await Course.findById(id);

    console.log(course);
    res.render("update", { course, user, role });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AddCourses,
  getCourses,
  updateCourses,
  deleteCourse,
  enrollCourses,
  addCoursesForm,
  course,
  revokeCourses,
};
