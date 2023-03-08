const mongoose=require("mongoose");

const RegisterSchema=new mongoose.Schema({
    email:{
        type:String,
      
     
    },
    password:{
        type:String,
        
        
    },
    password_confirmation:{
        type:String,
       
    },
   
})

const RegisterSch = mongoose.model("User", RegisterSchema);

module.exports = RegisterSch;

