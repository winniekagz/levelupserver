const RegisterSch=require('../../models/Auth/REgister')
const emailValidator = require('deep-email-validator');
console.log("123")
// async function isEmailValid(email) {
//     return emailValidator.validate(email)
//   }
const RegisterUser=async(req,res)=>{
    console.log("v")
    const {email,password,password_comfirmation}=req.body
    console.log(req.body)
    if (!email){
        res.status(422).json({"message":"Task name required"})
    }
    if (!password){
        res.status(422)
        res.json({"message":"Start date required"})
    }
    if (!password_comfirmation){
        res.status(422)
        res.json({"message":"Due date required"})
    }
    if(password !=password_comfirmation){
        res.status(422)
        console.log("err","passwords should match")
        res.json({"message":"Passwords should math"})
    }

    const {valid, reason, validators} = await isEmailValid(email);

  if (valid) return res.send({message: "OK"});

  return res.status(400).send({
    message: "Please provide a valid email address.",
    reason: validators[reason].reason
  })

   
    RegisterSch.findOne({email:email}).then((todo)=>{
        if (todo){
            res.status(422).json({"message":"User exists!"})
        } else{
            const newUser=new TodoSch({
                "email":email,
                "Password":password,
                "password_comfirmation":password,
                
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
}
const GetAll=(req,res)=>{
    RegisterSch.find().then((result)=>{
        res.status(200).json({data:result})
    }).catch((err)=>{
        res.status(500).json({message:err})
    })
}
const GetOne=(req,res)=>{
    RegisterSch.findOne({id:id}).then((result)=>{
        res.status(200).json({data:result})
    }).catch((err)=>{
        res.status(500).json({message:err})
    })
}

console.log("red",RegisterUser)

module.exports={RegisterUser,GetAll,GetOne};