require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./rotes/userRouter');
const mongoose = require('mongoose');
const adminRouter = require('./rotes/adminRouter');

mongoose.connect(process.env.MONGO_CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Mongo connected!")
})
.catch((err)=>{
    console.log("Error:\n ", err)
});

app.use('/user', express.json(), userRouter);

app.use('/admin', express.json(), adminRouter);

app.listen(process.env.PORT, ()=>{
    console.log("SERVER RUNING\n", process.env.PORT)
});