const user = require("../model/user");
const bcrypt=require("bcrypt");

const getUser=async(req,res,next)=>{
    try{
        if(req.body.permision==1){
            const users=await user.find({role: req.query.role});
            return res.send(users)
        }else{
            return res.send("you don't have permission to see user list")
        }
        
    }catch(e){
        console.log(e);
        return res.send(e);
    }
}
const getProfile=async(req,res,next)=>{
    try{
        const userId=req.body.userId;
        const userDetails=await user.findById(userId).select('name email role status');
        return res.send(userDetails);
    }catch(e){
        console.log(e);
        return res.send(e)
    }
}
const editProfile=async(req,res,next)=>{
    try{
        const update={
            name: req.body.name ?? ''
        }
        const editUser=await user.findOneAndUpdate({_id:req.body.userId},update);
        return res.send("successfully updated !");
    }catch(e){
        return res.send(e)
    }
}
const createRecuiter=async(req,res)=>{
    try{
        if(req.body.role!=3){
            return res.send("You can only create Recuiter here !")
        }
        if(req.body.permision!=1){
            return res.send("you don't have access to create Recuiter")
        }
        let pwd=await bcrypt.hash(req.body.pwd,12);
        const recuiterDetails={
            name: req.body.name,
            email: req.body.email,
            password: pwd,
            role: 3
        }
        const newRecuiter=await user.create(recuiterDetails);
        return res.send(newRecuiter);
    }catch(e){
        return res.send(e)
    }
}
module.exports={
    getUser,
    getProfile,
    editProfile,
    createRecuiter
}