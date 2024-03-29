const jwt = require("jsonwebtoken")
const {JWT_SECRET}=require("../keys")
const mongoose = require("mongoose")
const User = mongoose.model("Useri")

module.exports=(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization){
        res.status(401).json({error:"Y ou must be logged in"})
    }
    console.log("token present");
   const  token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            res.status(401).json({error:"You must be logged in"})
        }
        console.log("verification success");
        const {_id} = payload 
        User.findById(_id).then(userdata=>{
          
            req.user = userdata 
            console.log(req.user);
            next();
        })
       
    })
}