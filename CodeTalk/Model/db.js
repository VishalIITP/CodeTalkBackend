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
  ReferredBy: { type: String },
  Time: { type: String },
  VPA: { type: String },
  PTime: { type: String }
});

const feedbackschema = new mongoose.Schema({
  Name: { type: String },
  College: { type: String },
  Feedback: { type: String }
});

const newWebsiteschema = new mongoose.Schema({
  websiteName: { type: String },
  isActive: { type: Boolean },
  heroT1U: { type: String },
  heroT1D: { type: String },
  heroT2U: { type: String },
  heroT2D: { type: String },
  date: { type: String },
  time: { type: String },
  price: { type: String },
  strikePrice: { type: String },
  timer: { type: String },
  wthc1: { type: String },
  wthc2: { type: String },
  wttp: {type: String},
  Wtdp1h: { type: String },
  wtdp1c: { type: String },
  Wtdp2h: { type: String },
  wtdp2c: { type: String },
  Wtdp3h: { type: String },
  wtdp3c: { type: String },
  Wtdp4h: { type: String },
  wtdp4c: { type: String },
  Wtdp5h: { type: String },
  wtdp5c: { type: String },
  Wtdp6h: { type: String },
  wtdp6c: { type: String },


});

const StudentsModel = mongoose.model("students", studschema);
const FeedbackModel = mongoose.model("feedbacks", feedbackschema);
const NewWebsiteModel = mongoose.model("HeroTexts", newWebsiteschema);

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
      ReferredBy: data.ReferredBy,
      Time: data.Time,
      VPA: data.VPA,
      PTime: data.PTime,
    });
    await new_stud.save();
  } catch (error) {
    console.log(error);
  }
};

const findbyQueryMongoose = async (query) => {
  try {
    const studentwithgivenQuery = await StudentsModel.findOne(query)
    if (studentwithgivenQuery) {
      console.log("Correct Referral Code Applied-", query.UserRefrralCode, " Refered by:", studentwithgivenQuery.FirstName, studentwithgivenQuery.LastName);
      return studentwithgivenQuery;
    } else {
      console.log(query.UserRefrralCode, "is not a valid Referral Code");
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

const findallFeedbackMongoose = async () => {
  try {
    const allfeedbacks = await FeedbackModel.find({});
    if (allfeedbacks) {
      console.log("All feedbacks fetched successfully");
      return allfeedbacks;
    } else {
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



// New Website db

const addNewWebsiteToMongoose = async (data) => {
  try {
    var new_website = new NewWebsiteModel({
      websiteName: data.websiteName,
      isActive: false,
      heroT1U: data.heroT1U,
      heroT1D: data.heroT1D,
      heroT2U: data.heroT2U,
      heroT2D: data.heroT2D,
      date: data.date,
      time: data.time,
      price: data.price,
      strikePrice: data.strikePrice,
      timer: data.timer,
      wthc1: data.wthc1,
      wthc2: data.wthc2,
      wttp:data.wttp,
      Wtdp1h: data.wtdp1h,
      wtdp1c: data.wtdp1c,
      Wtdp2h: data.wtdp2h,
      wtdp2c: data.wtdp2c,
      Wtdp3h: data.wtdp3h,
      wtdp3c: data.wtdp3c,
      Wtdp4h: data.wtdp4h,
      wtdp4c: data.wtdp4c,
      Wtdp5h: data.wtdp5h,
      wtdp5c: data.wtdp5c,
      Wtdp6h: data.wtdp6h,
      wtdp6c: data.wtdp6c,

    })
    await new_website.save();
    console.log(new_website);
  } catch (error) {
    console.log(error);
  }
};

const getAllWebsites = async () => {
  try {
    const allwebsites = await NewWebsiteModel.find({});
    if (allwebsites) {
      console.log("Found all websites");
      return allwebsites;
    }
    else {
      console.log("There are no websites")
    }
  } catch (error) {
    console.log(error);
  }
};

const getDesignbyQuery = async (query) => {
  try {
    const desingforQuery = await NewWebsiteModel.findOne(query);
    if (desingforQuery) {
      console.log("Found desing for the website");
      return desingforQuery;
    }
    else {
      console.log("No design found for the given website")
    }

  } catch (error) {
    console.log(error);
  }
};

const updateWeb = async (query, newdata) => {
  try {
    const updatedWeb = await NewWebsiteModel.findOneAndUpdate(query, newdata, { new: true });
    if (updatedWeb) {
      console.log("Website found and updated successfully");
    }
    else {
      console.log("Website Not found");
    }
  } catch (error) {
    console.log(error);
  }
};

const activateNewWeb = async (query, newdata) => {
  try {
    await NewWebsiteModel.updateMany({ isActive: true }, { isActive: false }, { new: true });
    const updatedWeb = await NewWebsiteModel.findOneAndUpdate(query, newdata, { new: true });
    if (updatedWeb) {
      console.log("New website activated and previous websites deactivated");
    }
    else {
      console.log("Website not found");
    }
  } catch (error) {
    console.log(error);
  }
}

const deleteWeb = async (query) => {
  try {
    await NewWebsiteModel.deleteOne(query);
    console.log("Delete website designs successfully")
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  StudentsModel,
  addToMongoose,
  findbyQueryMongoose,
  updateToMongoose,
  addFeedbackToMongoose,
  findallStudentsMongoose,
  findallFeedbackMongoose,
  addNewWebsiteToMongoose,
  getAllWebsites,
  getDesignbyQuery,
  updateWeb,
  activateNewWeb,
  deleteWeb,
};