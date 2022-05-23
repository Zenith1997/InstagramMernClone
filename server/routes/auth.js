const express = require("express");
const { createUser, signIn } = require("../controllers/user-controllers");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin")

router.get("/protected",requireLogin,(req,res)=>{
     res.send("Access granted ")
})
router.get("/",(req,res)=>{
    res.send("Hello");
})
router.get("/get",(req,res)=>{
    res.send("get");
})
router.post("/signup",createUser)
router.post("/signin",signIn)


module.exports = router; 