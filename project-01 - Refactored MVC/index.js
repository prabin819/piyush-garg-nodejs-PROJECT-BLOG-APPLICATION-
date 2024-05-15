const express = require('express');
const userRouter = require('./routes/user');
const { connectMongoDb } = require('./connection');
const { logReqRes } = require('./middlewares');


const app = express();
const PORT = 8000;


//connection
connectMongoDb("mongodb://127.0.0.1:27017/piyushProject1").then(()=>console.log("mongodb connected"));

//middleware
app.use(express.urlencoded({extended: false}));
app.use(logReqRes("log.txt"));

//routes
app.use("/api/users", userRouter);


app.listen(PORT,()=>{console.log(`server started at PORT: ${PORT}`)});