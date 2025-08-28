const express = require('express');
const router = express.Router();
const UserData = require('../Models/usersData');
const jwt=require('jsonwebtoken')
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.post("/adduser", async (req, res) => {
    try {
        const post = req.body;
        const data = new UserData(post);
        await data.save();
        res.status(200).send({ message: "User added", users: data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to add user");
    }
});


router.post("/login",async (req,res)=>{
    try{
        const user=await UserData.findOne({email:req.body.email})
        if(!user){
            return res.sendStatus(404).send({message:"user not found"})

        }
    if(user.password==req.body.password){
const payload={email:req.body.email,pwd:req.body.password};
const token=jwt.sign(payload,"secret")

        res.status(200).send({message:"Login Succesfull",usertoken:token})

    }
    else{
        res.status(401).send({message:"Invalid credentials!"})
    }
}
    catch(error){
        console.error(error)
        res.status(500).send({message:"error in server"})

    }
})


module.exports = router;
