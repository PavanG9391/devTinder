const express = require("express")
const dns = require('dns');
const User = require("./models/User.js");

// Force Node.js to use Google DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express()
const DBConnect = require('./config/database');
app.use(express.json());


app.post("/signup", async (req,res)=>{
    const user = new User(req.body)

    try{
        await user.save();
        res.send('User added succesfully')
    }catch(err){
        res.status(400).send("error on saving data :" + err.message);
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

app.patch('/user', async (req,res)=>{
    const userId = req.body.userId;
    const data = req.body
    try{
          const user = await User.findByIdAndUpdate(userId, data);
          res.send("User updated successfully");                 
     }
     catch(err){
          res.status(400).send('something went wrong');
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



