const mongoose=require("mongoose");
const requireLogin = require("../middleware/requireLogin")

const Post = require("../models/post")




const createPost = (req,res)=>{
    const {title,body}=req.body
    if(!title||!body){
        return res.status(422).json({error:"Please add all the fields"})
    }
    console.log(req.user);
   
    const post = new Post({
        title:title,
        body:body,
        postedBy:req.user
    })
    post.save().then((post)=>{
        res.json({post})
    })

}
exports.createPost=createPost