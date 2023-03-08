const express = require('express');
const mongoose = require('mongoose');
const env=require("dotenv").config()
const app = express();
const RegisterUser=require("./routes/Auth/Register")
const cors=require("cors")
const port =process.env.PORT
const MONGO_URI=process.env.MONGOURL

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors())

app.use('/api/',RegisterUser)

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URI).then((result)=>{
    console.log(`database connected successfully`)
}).catch((err)=>{
    console.log("error in connecting db",err)
})

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})