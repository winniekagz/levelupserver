const crypto = require("crypto");
const ErrorResponse = require("../utilis/errorResponse");
const User = require("../Modelss/users");
const sendEmail = require("../utilis/sendEmail");
const bcrypt=require("bcrypt");
const { response } = require("express");

//    Login user
exports.login = async (req, res, next) => {
 
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
  //   // Check that user exists by email
    const user = await User.findOne({ email:email })
    const userr = await User.findOne({ email }).select('-password');
    // const userr = await User.findOne({ email })
    // .select("+password").exec();
    console.log("req.body",userr)
    if (!user) {
      // return next(new ErrorResponse("Invalid credentials", 401));
res.json({message:"invalid credentials"}).status(422)
    }
   user.comparePassword(password).then((result)=>{
    if(!result){
      res.json({message:"invalid credentials"}).status(422)
     
    }
    sendToken(userr, 200, res);
   })

  } catch (err) {
    next(err);
  }
};

//    Register user
exports.register = async (req, res, next) => {
  const { username, email, password,confirm_password } = req.body;
  

  try {
    const user = await User.create({
      username,
      email,
      password,
      confirm_password
    });

   const returnUser={...user}
   delete returnUser.password
   delete returnUser.confirm_password
    sendToken(user, 200, res,);
  } catch (err) {
    next(err);
  }
};
exports.ForgotPassword = async (req, res, next) => {
 console.log("test")
}
// @desc    Forgot Password Initialization
exports.forgotPassword = async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
   
    


    if (!user) {
      return next(new ErrorResponse("Email not found", 422));
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
console.log("user",user)
  sendEmail(user,resetUrl)
    return res.status(201).json({ message: "mail sent successfully" })
    
  } catch (err) {
    next(err);
  }
};


exports.resetPassword = async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    // find  Token
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const {username,email,_id}=user
const returnUser={username,email,_id}
  res.status(statusCode).json({ user:returnUser,sucess: true, token });
};
