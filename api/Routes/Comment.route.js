import express from "express"; 
import { addComment, commentCount, deleteComment, getALlComment, getComment } from "../controllers/Comment.controller.js";
import { authenticate } from "../middleware/authenticate.js";


const CommentRoute = express.Router();
CommentRoute.post('/add',authenticate, addComment)
CommentRoute.get('/get/:blogid', getComment)
CommentRoute.get('/get-count/:blogid', commentCount)
CommentRoute.get('/get-all-comments',authenticate, getALlComment)
CommentRoute.delete('/delete/:commentid',authenticate, deleteComment)


// upload.single('file'), 

export default CommentRoute;