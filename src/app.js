const express = require("express")
const dns = require('dns');
const User = require("./models/User.js");
const {validationForSignUP} = require("./utils/validation.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const bycrypt = require("bcrypt");

// Force Node.js to use Google DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express()
const DBConnect = require('./config/database');
app.use(express.json());
app.use(cookieParser());


app.post("/signup", async (req,res)=>{

  try{

    validationForSignUP(req);

    const {firstName,lastName,emailId,password} = req.body;
    
    const passwordHash =  await bycrypt.hash(password, 10);

    const user = new User({
        firstName,
        lastName,
        emailId,
        password : passwordHash
    })
        await user.save();
        res.send('User added succesfully')
    }catch(err){
        res.status(400).send("Error:" + err.message);
    }
    
})

app.post("/login", async (req,res)=>{
  try{
    const {emailId, password} =req.body;

    const user = await User.findOne({emailId : emailId});
    if(!user){
      throw new Error("EmailId is not valid in DB");
    }
     
    const isPasswordValid = await bycrypt.compare(password, user.password);
  

    if(isPasswordValid){
      const token = await jwt.sign({_id: user._id}, "DEV@Tinder123");
      console.log(token);
      res.cookie("token",token);
      res.send("Login successfull");
    }
    else {
      throw new Error("password is not correct");
    }

  } catch(err){
    res.status(400).send("Error:" + err.message)
  }

});

app.get('/profile', async (req,res)=> {
 
  try{
      const cookies = req.cookies;
      const {token} = cookies;

      if(!token){
        throw new Error("Invalid token, Please login again");
      }
    
      const decodedMessage = await jwt.verify(token, "DEV@Tinder123");
     const {_id} = decodedMessage;
      console.log(_id);

      const user = await User.findById(_id);

      res.send(user);
    }
    catch(err){
      res.status(400).send("Error", + err.message);
    }

     
})

app.get('/user', async (req,res)=> {
    const userEmail = req.body.emailId;
    
     try{
          const user = await User.find({emailId : userEmail});
          if(user){          
            res.send(user)
          }
          else{
            res.status(400).send('user not found') 
          }                    
     }
     catch(err){
          res.status(400).send('something went wrong');
     }
     
})

app.delete('/user' ,async ( req,res) => {
    const userId = req.body.userId;
    try{
          const user = await User.findByIdAndDelete(userId);
          res.send("User deleted successfully");                 
     }
     catch(err){
          res.status(400).send('something went wrong');
     }

})

app.patch('/user/:userId', async (req,res)=>{
    const userId = req.params?.userId;
    const data = req.body
    try{

          const ALLOWED_UPDATES = ["age", "gender" , "about" , "skills", "password"];
          const isUpdatedAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
          );
          console.log(isUpdatedAllowed);
          if(!isUpdatedAllowed){
            throw new Error("Update not allowed");
          }
          const user = await User.findByIdAndUpdate(userId, data, {runValidators:true});
          res.send("User updated successfully");                 
     }
     catch(err){
          res.status(400).send('something went wrong'+ err.message);
     }
})
DBConnect()
.then(()=>{
    console.log('Database connection is established');
    app.listen("3000" , ()=>{
    console.log("listen to port 3000 successfully");
    
})
})
.catch((err)=>{
    console.log('DB connection unsuccesfull');
})



