const express = require("express")

const app = express()

app.use((req,res)=>{
    res.send("welcome to tinder ")
})

app.listen("3000" , ()=>{
    console.log("listen to port 3000 successfully");
})

