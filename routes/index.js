const express = require("express");
const { authRoutes } = require("./auth/authRoutes");
const { userRoutes } = require("./user/userRoutes");
const { registrarRoutes } = require("./registrar/registrarRoutes");
const { instructorRoutes } = require("./instructor/instructorRoutes");
const { courseRoutes } = require("./course/courses");

const router = express.Router();

router.use("/api/auths", authRoutes);
router.use("/api/users", userRoutes);
router.use("/api/registrar", registrarRoutes);
router.use("/api/instructor", instructorRoutes);
// router.use("/api/users", courseRoutes);

module.exports = router;
