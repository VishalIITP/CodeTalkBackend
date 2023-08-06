const express = require("express");
const mongoose = require("mongoose");

const studschema = new mongoose.Schema({
  UserId: { type: String },
  FirstName: { type: String },
  LastName: { type: String },
  College: { type: String },
  Email: { type: String },
  Phone: { type: String },
  Time: { type: String },
  VPA: { type: String },
  PTime: { type: String },
});

const StudentsModel = mongoose.model("students", studschema);

const addToMongoose = (data) => {
  var new_stud = new StudentsModel({
    UserId: data.UserId,
    FirstName: data.FirstName,
    LastName: data.LastName,
    College: data.College,
    Email: data.Email,
    Phone: data.Phone,
    Time: data.Time,
    VPA: data.VPA,
    PTime: data.PTime,
  });

  new_stud.save();
};

const updateToMongoose = async (userId, updatedData) => {
  try {
    const updatedStudent = await StudentsModel.findOneAndUpdate(
      { "UserId": userId },
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


module.exports = { StudentsModel, addToMongoose, updateToMongoose };
