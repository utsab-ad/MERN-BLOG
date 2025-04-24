import express from "express"; 
import { addCategory, deleteCategory, getAllCategory, showCategory, updateCategory } from "../controllers/Category.controller.js";
import {onlyadmin} from "../middleware/onlyadmin.js"

const CategoryRoute = express.Router();
CategoryRoute.post('/add', onlyadmin, addCategory)
CategoryRoute.put('/update/:category_id', onlyadmin, updateCategory)
CategoryRoute.get('/show/:category_id', onlyadmin, showCategory)
CategoryRoute.delete('/delete/:category_id', onlyadmin, deleteCategory)
CategoryRoute.get('/all-category', getAllCategory)


// upload.single('file'), 

export default CategoryRoute;