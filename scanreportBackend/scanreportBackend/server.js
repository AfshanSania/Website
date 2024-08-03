import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import AnalysisRoute from "./Routes/AnalysisRoute.js"

const app=express();

app.use(express.static("public"))
app.use("images",express.static("images"))
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
 
app.use(cors())
dotenv.config() 

// mongoose.set('strictQuery', true);
// mongoose.connect("mongodb+srv://ahazadarsh0014:qxp5bfDk2h9aRw0K@cluster0.hfjrbt7.mongodb.net/?retryWrites=true&w=majority",
//     {useNewUrlParser:true,useUnifiedTopology:true}
//     ).then(()=>{
        
//     }).catch((err)=>{
//        console.log(err);
//     })
app.listen(5009,()=>console.log("Listening @ 5009"))
app.get("/test",(req,res)=>{
    res.send("hello ")
})


app.use("/scanreport",AnalysisRoute)


