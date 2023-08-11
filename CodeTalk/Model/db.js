const express = require("express");
const mongoose = require("mongoose");

const studschema = new mongoose.Schema({
  UserId: { type: String },
  UserRefrralCode: { type: String },
  FirstName: { type: String },
  LastName: { type: String },
  College: { type: String },
  Email: { type: String },
  Phone: { type: String },
  RefrrelCodeApplied: { type: String },
  Time: { type: String },
  VPA: { type: String },
  PTime: { type: String }
});

const feedbackschema = new mongoose.Schema({
  Name: { type: String },
  College: { type: String },
  Feedback: { type: String }
});

const StudentsModel = mongoose.model("students", studschema);
const FeedbackModel = mongoose.model("feedbacks", feedbackschema);

const addToMongoose = async (data) => {
  try {
    var new_stud = new StudentsModel({
      UserId: data.UserId,
      UserRefrralCode: data.UserRefrralCode,
      FirstName: data.FirstName,
      LastName: data.LastName,
      College: data.College,
      Email: data.Email,
      Phone: data.Phone,
      RefrrelCodeApplied: data.RefrrelCodeApplied,
      Time: data.Time,
      VPA: data.VPA,
      PTime: data.PTime,
    });
    await new_stud.save();
  } catch (error) {
    console.log(error);
  }
};

const findbyIdMongoose = async (userId) => {
  try {
    const studentwithgivenId = await StudentsModel.findOne({ UserId: userId })
    if (studentwithgivenId) {
      console.log("Student with ", userId, " is: ", studentwithgivenId);
    } else {
      console.log("No student with UserId: ", userId, " is found");
    }
  } catch (error) {
    console.log(error)

  }
}

const findallStudentsMongoose = async () => {
  try {
    const allRegStuds = await StudentsModel.find({});
    if (allRegStuds) {
      console.log("All registered Studedents are fetched successfully");
      return allRegStuds;
    } else {
      console.log("No Registerd Students to show");
    }

  } catch (error) {
    console.log(error)

  }
}

const findallFeedbackMongoose = async()=>{
  try {
    const allfeedbacks=await FeedbackModel.find({});
    if(allfeedbacks){
      console.log("All feedbacks fetched successfully");
      return allfeedbacks;
    }else{
      console.log("There are no feedbacks");
    }
    
  } catch (error) {
    console.log(error);
  }

}


const updateToMongoose = async (userId, updatedData) => {
  try {
    const updatedStudent = await StudentsModel.findOneAndUpdate(
      { UserId: userId },
      updatedData,
      { new: true }
    );
    if (updatedStudent) {
      console.log("Data updated for", updatedStudent.UserId, "is", updatedStudent);
    } else {
      console.log("No student found with UserId:", userId);
    }
  } catch (error) {
    console.log(error);
  }
};

const addFeedbackToMongoose = async (data) => {
  try {
    var new_feed = new FeedbackModel({
      Name: data.Name,
      College: data.College,
      Feedback: data.Feedback
    })
    await new_feed.save();
  } catch (error) {
    console.log(error);
  }
}

module.exports = { 
  StudentsModel, 
  addToMongoose, 
  findbyIdMongoose, 
  updateToMongoose, 
  addFeedbackToMongoose,
  findallStudentsMongoose,
  findallFeedbackMongoose
};