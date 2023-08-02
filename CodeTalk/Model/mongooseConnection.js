const mongoose=require('mongoose')
const config=require('../config')


async function connectToMongoose(){
    
    try {
        await mongoose.connect(config.mongoDBurl);
        console.log("Mongoose connected sussessfully");
        
        
    } catch (error) {
        console.log(error);

    }

    mongoose.connection.on('error',(err)=>{
        console.log("Error during reconnecting: ", err);
    })

    mongoose.connection.on('disconnect',(err)=>{
        console.log("Mongoose Disconnected, Error: ",err);
    })
    

}






















module.exports=connectToMongoose;