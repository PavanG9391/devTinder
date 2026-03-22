const express = require("express")
const dns = require('dns');
const User = require("./models/User.js");

// Force Node.js to use Google DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express()
const DBConnect = require('./config/database');


app.post("/signup", async (req,res)=>{
    const user = new User({
        firstName : 'Pawan',
        lastName : 'Gundabathula',
        emailId : 'pawan@gmail.com',
        password : 'pawan"123'
    })

    try{
        await user.save();
        res.send('User added succesfully')
    }catch(err){
        res.status(400).send("error on saving data :" + err.message);
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



