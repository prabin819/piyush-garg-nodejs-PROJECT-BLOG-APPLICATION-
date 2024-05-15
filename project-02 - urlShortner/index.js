const express = require('express');
const urlRoute = require('./routes/url');
const {connectMongoDb} = require('./connection');
const URL = require('./models/url');
const app = express()
const port = 8001;

connectMongoDb("mongodb://127.0.0.1:27017/piyushProject2")
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log(err));

app.use(express.json());

app.use('/url',urlRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})