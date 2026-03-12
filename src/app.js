const express = require("express")

const app = express()

app.get("/test", (req, res)=>{
    res.send("test get is succesfull");
})

app.post("/test", (req, res)=>{
    res.send({"firstname": "pavan", "lastname":"Gundabattula"});
    console.log("succesfuly stored in db");
})
app.delete("/test", (req, res)=>{
    res.send({"firstname": "pavan"});
})

app.listen("3000" , ()=>{
    console.log("listen to port 3000 successfully");
})

