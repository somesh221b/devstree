const mongoose=require("mongoose");

const userModel=new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    accessToken:{
        type: String,
    },
    role:{
        type: Number,
        enum:[1,2,3],
        //1-admin
        //2-client
        //3-recuiter
    },
    status:{
        type: Boolean,
        default: true
    }
});

module.exports=mongoose.model("user",userModel)