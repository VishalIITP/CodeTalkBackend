const express = require('express')
const {
    addToMongoose,
    findbyQueryMongoose,
    updateToMongoose,
    addFeedbackToMongoose,
    findallStudentsMongoose,
    findallFeedbackMongoose,
    addNewWebsiteToMongoose,
    getAllWebsites,
    getDesignbyQuery,
    deleteWeb,
    updateWeb,
    activateNewWeb,
} = require('./Model/db');


userRouter = express.Router();


userRouter.get('/referral/:query', async (req, res) => {
    try {
        const query = req.params.query;
        const queryObj = { "UserRefrralCode": query };
        let studentbyQuery = await findbyQueryMongoose(queryObj);
        if (studentbyQuery) {
            res.status(200).send({ "Code": studentbyQuery.UserRefrralCode, "ReferredBy": studentbyQuery.FirstName + " " + studentbyQuery.LastName });
        } else {
            res.status(404).send("This is not a valid referral code");
            console.log("Invalid referral Code Applied")
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error while getting student query details")

    }

})

userRouter.get('/admin/allStudents/', async (req, res) => {
    try {
        let allStuds = await findallStudentsMongoose();
        res.status(200).send(allStuds);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error while getting all Registered Students");
    }
})

userRouter.get('/admin/allFeedbacks/', async (req, res) => {
    try {
        let allFeeds = await findallFeedbackMongoose();
        res.status(200).send(allFeeds);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error while getting all Feedbacks")
    }

})



userRouter.post('/register/', (req, res) => {
    try {
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
        res.status(200).send("Feedback added successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while posting new feedback");
    }
});

//Design routes

userRouter.get('/allwebsites', async (req, res) => {
    try {
        let allwebs = await getAllWebsites();
        res.status(200).send(allwebs);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
});

userRouter.get('/design/:query', async(req,res)=>{
    try {
        const query =req.params.query;
        const queryobj={'websiteName':query};
        const design=await getDesignbyQuery(queryobj);
        if(design){
            console.log("Design Fetched Successfully");
            res.status(200).send(design);
        }
        else{
            console.log("Website Not Available");
            res.status(400).send("Website not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
});

userRouter.get('/update-website/:query', async(req,res)=>{
    try {
        const query =req.params.query;
        const queryobj={'_id':query};
        const design=await getDesignbyQuery(queryobj);
        if(design){
            console.log("Design Fetched Successfully");
            res.status(200).send(design);
        }
        else{
            console.log("Website Not Available");
            res.status(400).send("Website not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
});

userRouter.get('/active-website/', async(req,res)=>{
    try {
        const queryobj={'isActive':true};
        const design=await getDesignbyQuery(queryobj);
        if(design){
            console.log("Design Fetched Successfully");
            res.status(200).send(design);
        }
        else{
            console.log("Website Not Available");
            res.status(400).send("Website not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
});

userRouter.put('/active-website/:query', async(req,res)=>{
    try {
        const query =req.params.query;
        const newdata=req.body;
        const queryobj={'_id':query};
        const design=await activateNewWeb(queryobj,newdata);
        res.status(200).send("Website activated successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
});

userRouter.put('/update-website/:query', async(req,res)=>{
    try {
        const query =req.params.query;
        const newdata=req.body;
        const queryobj={'_id':query};
        const design=await updateWeb(queryobj,newdata);
        res.status(200).send("Website Updated Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
});


userRouter.post('/design/', async (req, res) => {
    try {
        await addNewWebsiteToMongoose(req.body);
        res.status(200).send("New website data added successfully");

    } catch (error) {
        console.log(error);
        res.status(500).send("Error while adding new website details");
    }
});

userRouter.delete('/deleteWebD', async (req,res)=>{
    try {
        const query=req.body;
        await deleteWeb(query)
    } catch (error) {
        
    }
})









module.exports = { userRouter }