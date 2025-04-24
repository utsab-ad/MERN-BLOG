import express from "express"; 
import { doLike, likeCount } from "../controllers/BlogLike.controller.js";
import { authenticate } from "../middleware/authenticate.js";


const BlogLikeRoute = express.Router();
BlogLikeRoute.post('/do-like', authenticate, doLike)
BlogLikeRoute.get('/get-like/:blogid', likeCount); // without userid
BlogLikeRoute.get('/get-like/:blogid/:userid', likeCount); 


// upload.single('file'), 

export default BlogLikeRoute;