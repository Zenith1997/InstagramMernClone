const mongoose=require("mongoose");
const { findOne } = require("../models/user");
const Useri = require("../models/user")
const jwt = require("jsonwebtoken")
const brypt = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");
const {JWT_SECRET} = require("../keys")






createUser=async(req,res)=>{
    const {name,email,password} = req.body;
    if(!name||!email||!password){
        res.status(422).send("Please add all the fields")
     
    }
    else{
        Useri.findOne({email:email})
        .then((savedUser)=>{
          if(savedUser){
              res.send("User already exists")
          }
          bcrypt.hash(password,12)
          .then(hashedPassword=>{
              const user = new Useri({
                  name,
                  email,
                  password:hashedPassword
              })
              user.save().then((user)=>{
                  res.send({user})
                  console.log("User saved successfully");
                  
              }).catch((err)=>{
                  console.log(err);
              })
          }).catch((err)=>{
              console.log(err);
          })
        })
    
    }

}

const signIn = async(req,res) =>{
    const {email,password} = req.body
    if(!email||!password){
        res.status(422).send("Please fill all the fields")
    }
    Useri.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser){
            res.send("User does not exist")
        }
        bcrypt.compare(password,savedUser.password).then((doMatch)=>{
            if(doMatch){
                
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                res.json({token})
                //res.send("Successfully signed in")
            }else{
                res.send("Invalid passswords")
            }
        })
    }).catch((err)=>{
        console.log(err);
    })
}

exports.createUser=createUser;
exports.signIn=signIn