const { validationResult } = require("express-validator");
const passport = require("passport");
const hashedPassword = require("../utils/password").hashedPassword;
const signJwt = require("../utils/signJwt");
const { User } = require("../models/User");
const { roles } = require("../utils/constant");

const registration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.render("register", {
        email: req.body.email,
        username: req.body.username,
        errorMessages,
      });
    }
    const saltHash = await hashedPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    let role = roles.student;

    if (req.body.email === "yero@gmail.com") {
      role = roles.registrar;
    }

    const newUser = new User({
      email: req.body.email,
      hash: hash,
      salt: salt,
      username: req.body.username,
      role: role,
    });

    await newUser.save();

    res.redirect("/api/auths/login");
  } catch (error) {
    console.error(error);
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      const errorMessages = [info.message];
      return res.render("login", { errorMessages });
    }

    const tokenObject = signJwt.issueJWT(user, "local");
    console.log("Token Object:", tokenObject);

    res.cookie("token", tokenObject.token, { httpOnly: true });

    res.redirect("/api/users/home");
  })(req, res, next);
};

const registrationForm = (req, res) => {
  res.render("register.ejs");
};

const loginForm = (req, res) => {
  res.render("login.ejs");
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/api/auths/login");
};

const googleAuth = (req, res) => {
  const token = signJwt.issueJWT(req.user);
  console.log(req.user);
  res.cookie("token", token.token, { httpOnly: true });
  res.redirect("/api/users/home");
};

const facebookAuth = (req, res) => {
  const token = signJwt.issueJWT(req.user);
  console.log(req.user);
  res.cookie("token", token.token, { httpOnly: true });
  res.redirect("/api/users/home");
};

const githubAuth = (req, res) => {
  const token = signJwt.issueJWT(req.user);
  console.log(req.user);
  res.cookie("token", token.token, { httpOnly: true });
  res.redirect("/api/users/home");
};

module.exports = {
  registration,
  login,
  logout,
  registrationForm,
  loginForm,
  googleAuth,
  facebookAuth,
  githubAuth,
};
