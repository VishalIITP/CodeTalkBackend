const express=require('express')
const {addToMongoose}=require('./Model/db')


userRouter=express.Router();
itemRouter=express.Router();


userRouter.get('/details/',(req,res)=>{
    res.status(200).send("These are the users details");
})



userRouter.post('/register/',(req,res)=>{
    console.log("Ye hoon bhai json.parse ke upar wala: ",req.body);
    addToMongoose(req.body);

    res.status(200).send("YD forms has requested a post method from reactjs");
    
})

itemRouter.get('/details/',(req,res)=>{
    res.status(200).send("These are the items details");
})




module.exports={userRouter,itemRouter}





