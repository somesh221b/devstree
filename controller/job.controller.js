const job = require("../model/job");
const user = require("../model/user");

function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}

const createJob=async(req,res)=>{
    try{
        if(req.body.role!=2){
            return res.send("You don't have access to create job post");
        }

        const recuiters=await user.find({role:3}).select('_id');
        const recuiter=getRandomItem(recuiters);
        const jobDetail={
            name: req.body.name,
            assignedTo: recuiter
        };
        const newJob=await job.create(jobDetail).catch(e=>{console.log(e);});
        return res.send(newJob);
    }catch(e){
        return res.send(e);
    }
}
const editJob=async(req,res)=>{
    try{
        await job.findOneAndUpdate({_id:req.body.jobId, assignedTo: req.body.userId},{note:req.body.note});
        return res.send("Successfully Job note added");
    }catch(e){
        return res.send(e);
    }
}
const getJob=async(req,res)=>{
    try{
        let jobs;
        console.log(req.body.permision);
        if(req.body.permision==3){
            jobs= await job.find({assignedTo:req.body.userId});
        }else{
            jobs= await job.find();
        }
        return res.send(jobs);
    }catch(e){
        return res.send(e);
    }
}
module.exports={
    createJob,
    editJob,
    getJob
}