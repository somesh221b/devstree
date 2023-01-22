const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");

const app=express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

const url="mongodb+srv://somesh:Somesh123@devstree.3wv5fxx.mongodb.net/devstree";

mongoose.connect(url);

const con= mongoose.connection;

con.on("open",()=>{
    console.log("DB connected...");
});

const router=require("./router/apiRouter")
app.use("/",router);
app.listen(3000,()=>{
    console.log("server started...");
})