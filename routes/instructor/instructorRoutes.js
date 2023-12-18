const router = require("express").Router();
const {
  studentsEnrollment,
  grade,
} = require("../../controllers/instructorController");
const { authenticateJWT } = require("../../Middlewares/passsportMiddleware");

const { checkPermissionMiddleware } = require("../../utils/auth");

router.get(
  "/instructor/studentList",
  authenticateJWT,
  checkPermissionMiddleware,
  studentsEnrollment
);

router.post(
  "/Instructor/update-grade",
  authenticateJWT,
  checkPermissionMiddleware,
  grade
);

module.exports.instructorRoutes = router;
