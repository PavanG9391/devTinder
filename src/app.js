const express = require("express")

const app = express()


app.use('/route', (req,res,next)=>{
  console.log('1st route sucessfully rendered');
  next();
},(req,res,next)=>{
  console.log('2dn route sucessfully rendered');
  next();
}, (req,res,next)=>{
  console.log('3rd route sucessfully rendered');
  next();
},(req,res,next)=>{
  console.log('4th route sucessfully rendered');
  res.send('4th response');
})

app.listen("3000" , ()=>{
    console.log("listen to port 3000 successfully");
})

