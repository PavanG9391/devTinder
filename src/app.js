const express = require("express")

const app = express()

const {adminAuth} = require('./middlewares/adminAuth')
app.use('/admin', adminAuth)

app.use('/admin/getAllData',(req,res)=>{
    throw new err('something wring in your code');
    
    res.send('get the all the data for the request is successfull');
})

app.use('/admin/deleteTheUser',(req,res)=>{
    res.send('User data is deleted succesfully');
})

app.use('/',(err,req,res,next)=>{
    if(err){
        res.status(500).send('some error has occred in the admin, contact support team.')
    }
})

app.listen("3000" , ()=>{
    console.log("listen to port 3000 successfully");
})

