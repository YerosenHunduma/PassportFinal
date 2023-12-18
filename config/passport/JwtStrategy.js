const { User } = require("../../models/User");
const JwtStrategy = require("passport-jwt").Strategy;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token;
  }
  console.log("Token extracted:", token);
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: "secret",
};

const Jwt_strategy = new JwtStrategy(opts, async function (jwt_payload, done) {
  console.log("JWT Payload:", jwt_payload);
  try {
    const user = await User.findOne({ _id: jwt_payload.sub });
    if (!user) {
      // Redirect to login page if there's no user
      return done(null, false, { message: "Unauthorized" });
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});

module.exports.Jwt_strategy = Jwt_strategy;
