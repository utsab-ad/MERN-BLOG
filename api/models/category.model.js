import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }

});

const Category = mongoose.model('Category', categorySchema, 'category');
export default Category;