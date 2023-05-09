const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
  },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    unique: [true, "Email already exists"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  image:{
    type:String,
    required:false
  },
  description:{
    type:String,
    required:false
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
  
  
  },
  confirm_password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select:false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirm_password = await bcrypt.hash(this.confirm_password, salt);
  next();
});
// match password and ;hash password
UserSchema.methods.comparePassword =  async function (password) {
  console.log("password", password)
  console.log("this.password", this.password)
  return await bcrypt.compare(password, this.password);

};

// get jwt token
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, "proceJWT_SECRETss.env.", {
    expiresIn:"1h",
  });
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); 

  return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
