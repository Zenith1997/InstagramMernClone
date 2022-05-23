const express =require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const {MONGOURI} =require("./keys")
const authrouter = require("./routes/auth");
const postrouter =require("./routes/post")




app.use(express.json())
app.use(authrouter);
app.use(postrouter);

try{
  mongoose.connect(MONGOURI);
  console.log("Database connected");
}catch(err){
  console.log(err);
}

app.get("/",(req,res)=>{
  console.log("Hello");
  res.send("Hello");
})

app.listen(PORT,(req,res)=>{
  console.log("Listenening to port 5000");
})
