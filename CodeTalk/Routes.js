const express = require('express')
const { addToMongoose, findbyIdMongoose, updateToMongoose, addFeedbackToMongoose } = require('./Model/db')


userRouter = express.Router();


userRouter.get('/', async (req, res) => {
    try {
        userId = req.body.UserId;
        console.log("Ye mil raha hai bhai id", userId);
        await findbyIdMongoose(userId);
        res.status(200).send("User details fetched successfully");

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error while getting student details")

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





