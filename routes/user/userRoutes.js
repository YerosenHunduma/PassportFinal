const router = require("express").Router();
const { home, profile } = require("../../controllers/userController");
const { getCourses } = require("../../controllers/CourseController");

const { authenticateJWT } = require("../../Middlewares/passsportMiddleware");

const { checkPermissionMiddleware } = require("../../utils/auth");

router.get("/home", authenticateJWT, checkPermissionMiddleware, home);

router.get("/profile", authenticateJWT, checkPermissionMiddleware, profile);

router.get("/courses", authenticateJWT, checkPermissionMiddleware, getCourses);

module.exports.userRoutes = router;
