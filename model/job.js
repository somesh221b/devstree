const mongoose=require("mongoose");

const jobModel=new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    note:{
        type: [String],
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    status:{
        type: Boolean,
        default: true
    }
});

module.exports=mongoose.model("job",jobModel)