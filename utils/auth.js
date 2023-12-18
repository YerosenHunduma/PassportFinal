const checkPermissionMiddleware = (req, res, next) => {
  const userRole = req.user.role;

  if (req.baseUrl.startsWith("/api/user")) {
    return next();
  } else if (
    req.baseUrl.startsWith("/api/registrar") &&
    userRole === "REGISTRAR"
  ) {
    return next();
  } else if (
    req.baseUrl.startsWith("/api/instructor") &&
    userRole === "INSTRUCTOR"
  ) {
    return next();
  } else {
    const errorMessage = "Invalid role for this resource";
    return res.redirect("/api/users/home");
  }
};

module.exports.checkPermissionMiddleware = checkPermissionMiddleware;
