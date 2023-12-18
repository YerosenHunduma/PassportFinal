const router = require("express").Router();

const { checkPermissionMiddleware } = require("../../utils/auth");

const {
  AddCourses,
  updateCourses,
  deleteCourse,
  enrollCourses,
  addCoursesForm,
  course,
  revokeCourses,
} = require("../../controllers/CourseController");
const { authenticateJWT } = require("../../Middlewares/passsportMiddleware");

router.post(
  "/courses/addCourses",
  authenticateJWT,
  checkPermissionMiddleware,
  AddCourses
);

router.get(
  "/courses/add_Courses",
  authenticateJWT,
  checkPermissionMiddleware,
  addCoursesForm
);

router.put(
  "/courses/course/:id",
  authenticateJWT,
  checkPermissionMiddleware,
  updateCourses
);

router.delete(
  "/courses/deleteCourse",
  authenticateJWT,
  checkPermissionMiddleware,
  deleteCourse
);

router.post(
  "/courses/enroll-courses",
  authenticateJWT,
  checkPermissionMiddleware,
  enrollCourses
);

router.post(
  "/courses/revokeEnrollment",
  authenticateJWT,
  checkPermissionMiddleware,
  revokeCourses
);

router.get(
  "/courses/course/:id",
  authenticateJWT,
  checkPermissionMiddleware,
  course
);

module.exports.courseRoutes = router;
