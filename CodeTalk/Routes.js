const express = require('express')
const { 
    addToMongoose, 
    findbyQueryMongoose, 
    updateToMongoose, 
    addFeedbackToMongoose,
    findallStudentsMongoose,
    findallFeedbackMongoose
} = require('./Model/db');


userRouter = express.Router();


userRouter.get('/referral/:query', async (req, res) => {
    try {
        const query = req.params.query;
        console.log("Ye hai apki query",query);
        const queryObj={"UserRefrralCode":query};
        let studentbyQuery= await findbyQueryMongoose(queryObj);
        if(studentbyQuery){
            res.status(200).send({"Code":studentbyQuery.UserRefrralCode, "ReferredBy":studentbyQuery.FirstName+" "+studentbyQuery.LastName});
        }else{
            res.status(404).send("This is not a valid referral code");
            console.log("Invalid referral Code Applied")
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error while getting student query details")

    }

})

userRouter.get('/admin/allStudents/', async (req,res)=>{
    try {
        let allStuds=await findallStudentsMongoose();
        res.status(200).send(allStuds);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error while getting all Registered Students");
    }
})

userRouter.get('/admin/allFeedbacks/',async (req,res)=>{
    try {
        let allFeeds=await findallFeedbackMongoose();
        res.status(200).send(allFeeds);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error while getting all Feedbacks")
    }

})



userRouter.post('/register/', (req, res) => {
    try {
        // console.log("The new user data is: ", req.body);
        addToMongoose(req.body);
        res.status(200).send("YD forms has requested a post method from reactjs");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while posting new student data");
    }
})

userRouter.put('/register/checkout/', async (req, res) => {
    try {
        const updatedData = req.body;
        const userId = req.body.UserId;

        await updateToMongoose(userId.toString(), updatedData);

        res.status(200).send("User details updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating user details");
    }
});

userRouter.post('/feedback/', async (req, res) => {

    try {
        await addFeedbackToMongoose(req.body);
        res.status(200).send("Feedback added successfully")
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while posting new feedback");
    }
})



module.exports = { userRouter }