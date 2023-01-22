const express=require("express");
const { signUp, logIn, verifyToken } = require("../controller/auth.controller");
const { createJob, editJob, getJob } = require("../controller/job.controller");
const { getUser, getProfile, editProfile, createRecuiter } = require("../controller/user.controller");
const router=express.Router();

router.post("/signUp",signUp);
router.post("/logIn",logIn);
router.get('/user',verifyToken,getUser);
router.get("/profile",verifyToken,getProfile);
router.put("/edit-profile",verifyToken,editProfile);
router.post("/create-recuiter",verifyToken,createRecuiter);

router.post("/create-job",verifyToken,createJob);
router.put("/edit-job",verifyToken,editJob);
router.get("/job",verifyToken,getJob);
module.exports=router