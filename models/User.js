const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { roles } = require("../utils/constant");

const UserSchema = new Schema({
  username: String,
  facebookId: String,
  githubId: String,
  googleId: String,
  email: String,
  hash: String,
  salt: String,
  role: {
    type: String,
    enum: [roles.student, roles.instructor, roles.registrar],
    default: roles.student,
  },
});

UserSchema.post("delete", async function (doc) {
  await StudentCourse.deleteMany({ user: doc._id });
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
