const FacebookStrategy = require("passport-facebook").Strategy;
const { User } = require("../../models/User");

const Facebook_Strategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:7777/api/auths/auth/facebook/callback",
    profileFields: ["id", "displayName", "name", "gender", "email", "picture"],
  },
  async function (accessToken, refreshToken, profile, done) {
    console.log(profile.id);
    try {
      let user = await User.findOne({ facebookId: profile.id });
      if (user) {
        done(null, user);
      } else {
        const newUser = new User({
          facebookId: profile.id,
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

module.exports.Facebook_Strategy = Facebook_Strategy;
