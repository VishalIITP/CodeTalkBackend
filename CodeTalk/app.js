const express=require('express')
const app= new express()
const cors=require('cors')
const config=require('./config')
const PORT =config.PORT;
const connectToMongoose=require('./Model/mongooseConnection')
const {userRouter}=require('./Routes')



connectToMongoose();

app.use((req,res,next)=>{
    console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`)
    next();
})


app.use(cors());
app.use(express.json());

app.use('/',userRouter)




app.listen(PORT,()=>{
    console.log("Server is ready and listening on port ",PORT);
})