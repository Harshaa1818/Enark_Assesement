import express from 'express'

const app=express();

app.use("/",(req,res)=>{
    res.send("app is running")
})

app.listen(8000,(req,res)=>{
    console.log("app is listening on port 8000");
})