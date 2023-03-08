const express=require("express");
const RegisterSch=require('../../models/Auth/REgister')
const { RegisterUser, GetAll, GetOne } = require("../../Controllers/Auth/Register");
const router = express.Router();

const emailValidator = require('deep-email-validator');
// console.log("123")
async function isEmailValid(email) {
    return emailValidator.validate(email)
  }


router.post("/register",function async(req, res) {
    console.log("v")
    const {email,password,password_confirmation}=req.body
    console.log(req.body)
    if (!email){
        res.status(422).json({"message":"Email  password_confirmation required"})
    }
    if (!password){
        res.status(422)
        res.json({"message":"password required"})
    }
    if (!password_confirmation){
        res.status(422)
        res.json({"message":"password confirmation required"})
    }
    if(password !=password_confirmation){
        res.status(422)
        console.log("err","passwords should match")
        res.json({"message":"Passwords should math"})
    }
 

RegisterSch.findOne({email:email}).then((todo)=>{
    if (todo){
        res.status(422).json({"message":"User exists!"})
    } else{
   
        const newUser=new RegisterSch({
            "email":email,
            "Password":password,
            "  password_confirmation":  password_confirmation,
            
        })
        newUser.save().then((result)=>{
            res.status(200),
            res.json(result)
    }).catch((err)=>{
            res.status(500)
            res.json({"message":err})
        })
    }
})
})
router.get("/users",GetAll)
router.get("/user/:id",GetOne)

router.get("/about", function (req, res) {
    res.send("About this wiki");
  });

  
module.exports=router