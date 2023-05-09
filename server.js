const express=require("express");
const dotenv=require("dotenv")
const connectDB=require("./config/db")
const cors=require("cors")
const app=express()
dotenv.config()

PORT=process.env.PORT
app.use(express.json())
app.use("/api/auth",require("./routes/auth"))
app.use("/api/private",require("./routes/private"))

connectDB()
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions))

const server=app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});