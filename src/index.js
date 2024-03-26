const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const { log } = require('console');
const  collection = require("./config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use ejs as the view engine
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login")
})
app.get("/signup", (req, res) => {
    res.render("signup")
})
app.post("/signup", async (req, res) => {
const data = {
    name: req.body.username,
    password: req.body.password 
}
const existinguser = await collection.findOne({name:data.name});
if(existinguser){
    res.send("You already have an account with this username")
}
else{
    const saltrounds = 10;
    const hashPassword = await bcrypt.hash(data.password,saltrounds);
    data.password = hashPassword
    const username = await collection.insertMany(data);
    console.log(username);}
    });




app.post("/login",async(req,res)=>{
try{
    const check = await collection.findOne({name:req.body.username});
    if(!check){
        res.send("user cannnot found");
    }
    const isPasswordMatch = await bcrypt.compare(req.body.password,check.password);
    if(isPasswordMatch){
        res.render("home");
    }
    else{
        req.send("incorrect password: ")
    }
}
catch{
res.send("worng Details")

}
});

const port = 5000;
app.listen(port,()=>{
    console.log('server is running on port $(port)');
    })