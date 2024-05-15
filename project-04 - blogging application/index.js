require('dotenv').config()

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const userRoute= require('./routes/user');
const blogRoute= require('./routes/blog');
const Blog = require('./models/blog');



const app = express();
const PORT = process.env.PORT || 8000; //export PORT=3456;

//mongoose.connect('mongodb://localhost:27017/blogify').then(()=>{console.log('mongodb connected.');})
mongoose.connect(process.env.MONGO_URL).then(()=>{console.log('mongodb connected.');})     //export MONGO_URL=mongodb://localhost:27017/blogify;
//also
//make sure you have start script when deploying becuz cloud providers run this script

// in aws change index.js to app.js


app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));
app.use(checkForAuthenticationCookie('token'))

app.get('/',async (req, res)=>{
    const allBlogs = await Blog.find({})
    res.render('home',{
        user: req.user,
        blogs: allBlogs
    });
})
app.use('/user',userRoute)
app.use('/blog',blogRoute)

app.listen(PORT, ()=>{ console.log("server started at port ", PORT);})