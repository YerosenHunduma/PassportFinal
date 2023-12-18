const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../../models/User");

const Google_Strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:7777/api/auths/auth/google/callback",
  },
  async function (accessToken, refreshToken, profile, done) {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (user) {
        done(null, user);
      } else {
        const newUser = new User({
          googleId: profile.id,
          username: profile.displayName,
        });
        user = await newUser.save();
        console.log("new user registered");
        done(null, user);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports.Google_Strategy = Google_Strategy;
