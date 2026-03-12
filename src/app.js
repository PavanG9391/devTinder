const express = require("express")

const app = express()

// app.get("/test", (req, res)=>{
//     res.send("test get is succesfull");
// })

// app.post("/test", (req, res)=>{
//     res.send({"firstname": "pavan", "lastname":"Gundabattula"});
//     console.log("succesfuly stored in db");
// })
// app.delete("/test", (req, res)=>{
//     res.send({"firstname": "pavan"});
// })

let users = [
    {id : 1, firstname : "pavan", lastname:"gundabathula"},
    {id: 2, firstname: "priya", lastname:"gunda"}
]

app.get('/test', (req,res)=>{
    res.send(users)
})

app.post('/users', (req,res)=>{
    const newUser = {id : users.length+1, firstname:'satya', lastname:'gundab'};
    users.push(newUser);
    res.send(newUser);
})

app.put('/users/:id' ,(req,res)=>{
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if(index !== -1){
        users[index] = {id, firstname : 'priya priya', lastname :'baladoor'};
        res.send(users[index]);
    }else{
        res.status(404).send({message: 'User not found'})
    }
})

app.patch("/users/:id", (req, res) => {
const id = parseInt(req.params.id);
const user = users.find(u => u.id === id);

if (user) {
Object.assign(user,{firstname : 'priyasiri' }); 
res.send(user);
} else {
res.status(404).send({ message: "User not found" });
}
});


app.listen("3000" , ()=>{
    console.log("listen to port 3000 successfully");
})

