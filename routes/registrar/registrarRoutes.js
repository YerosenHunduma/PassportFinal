const router = require("express").Router();
const {
  manageStudent,
  user,
  updateRole,
  updateUserInfo,
  updateInfoForm,
  userEnrolledCourses,
} = require("../../controllers/registrarController");
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

const { checkPermissionMiddleware } = require("../../utils/auth");

router.get(
  "/registrar",
  authenticateJWT,
  checkPermissionMiddleware,
  manageStudent
);

router.get(
  "/registrar/user/:id",
  authenticateJWT,
  checkPermissionMiddleware,
  user
);

router.get(
  "/registrar/user/:id",
  authenticateJWT,
  checkPermissionMiddleware,
  userEnrolledCourses
);

router.post(
  "/registrar/update-role",
  authenticateJWT,
  checkPermissionMiddleware,
  updateRole
);
router.put(
  "/registrar/:id",
  authenticateJWT,
  checkPermissionMiddleware,
  updateUserInfo
);

router.get(
  "/registrar/:id",
  authenticateJWT,
  checkPermissionMiddleware,
  updateInfoForm
);

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
module.exports.registrarRoutes = router;
