const passport = require("passport");

module.exports.authenticateJWT = (req, res, next) => {
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/api/auths/login",
  })(req, res, next);
};
