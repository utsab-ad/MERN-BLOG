import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'
import mongoose from "mongoose";
import AuthRoute from "./Routes/Auth.route.js";
import UserRoute from "./Routes/User.route.js";
import CategoryRoute from "./Routes/Category.route.js";
import BlogRoute from "./Routes/Blog.route.js";
import CommentRoute from "./Routes/Comment.route.js";
import BlogLikeRoute from "./Routes/Bloglike.route.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));


// route setup
app.use('/api/auth', AuthRoute)
app.use('/api/user', UserRoute)
app.use('/api/category', CategoryRoute)
app.use('/api/blog', BlogRoute)
app.use('/api/comment', CommentRoute)
app.use('/api/blog-like', BlogLikeRoute)



mongoose.connect(process.env.MONGODB_URL, {dbName: 'data-base'})
.then(() => console.log("mongodb connected"))
.catch(err => console.log("!! DATABASE WARN !!", err));






app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500 
  const message = err.message || 500
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})