const express = require("express")

const app = express()

const {adminAuth} = require('./middlewares/adminAuth')
app.use('/admin', adminAuth)

app.use('/admin/getAllData',(req,res)=>{
    res.send('get the all the data for the request is successfull');
})

app.use('/admin/deleteTheUser',(req,res)=>{
    res.send('User data is deleted succesfully');
})

app.listen("3000" , ()=>{
    console.log("listen to port 3000 successfully");
})

