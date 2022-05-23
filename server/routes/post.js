const express = require("express");
const router = express.Router();
const moongoose =require("mongoose");
const { createPost } = require("../controllers/post-controllers");
const requireLogin = require("../middleware/requireLogin");

router.post("/createpost",requireLogin,createPost)




module.exports=router