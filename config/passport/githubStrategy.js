const GitHubStrategy = require("passport-github2").Strategy;
const { User } = require("../../models/User");

const GitHub_Strategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:7777/api/auths/auth/github/callback",
  },
  async function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    try {
      let user = await User.findOne({ githubId: profile.id });
      if (user) {
        done(null, user);
      } else {
        const newUser = new User({
          githubId: profile.id,
          username: profile.displayName,
        });

        user = await newUser.save();
        console.log("New GitHub user registered");
        done(null, user);
      }
    } catch (error) {
      console.log(error);
      done(error, null);
    }
  }
);

module.exports.GitHub_Strategy = GitHub_Strategy;
