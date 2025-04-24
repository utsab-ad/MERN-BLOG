import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js";
import Blog from "../models/blog.model.js";
import Category from "../models/category.model.js";
import { encode, encodeHTML } from "entities";

export const addBlog = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    let featuredImage = "";
    if (req.file) {
      // Upload an image
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, { folder: "U-Blog", resource_type: "auto" })
        .catch((error) => {
          next(handleError(500, error.message));
        });

      featuredImage = uploadResult.secure_url;
    }

    const blog = new Blog({
      author: data.author,
      category: data.category,
      title: data.title,
      slug: data.slug,
      featuredImage: featuredImage,
      blogcontent: encode(data.blogcontent),
    });

    await blog.save();
    res.status(200).json({
      success: true,
      message: "Blog added successgully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const editBlog = async (req, res, next) => {
  try {
    try {
      const { blogid } = req.params;
      const blog = await Blog.findById(blogid).populate("category", "name");
      if (!blog) {
        return next(handleError(404, "Data not found !"));
      }

      return res.status(200).json({
        success: true,
        blog,
      });
    } catch (error) {
      next(handleError(500, error.message));
    }
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const updateBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const data = JSON.parse(req.body.data);

    let featuredImage = "";
    if (req.file) {
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, { folder: "U-Blog", resource_type: "auto" })
        .catch((error) => {
          return next(handleError(500, error.message));
        });

      featuredImage = uploadResult.secure_url;
    }

    const updatedFields = {
      category: data.category,
      title: data.title,
      slug: data.slug,
      blogcontent: encode(data.blogcontent),
    };

    if (featuredImage) {
      updatedFields.featuredImage = featuredImage;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogid, updatedFields, {
      new: true,
    });

    if (!updatedBlog) {
      return next(handleError(404, "Blog not found"));
    }

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    await Blog.findByIdAndDelete(blogid);

    res.status(200).json({
      success: true,
      message: "Blog Deleted successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const showAllBlog = async (req, res, next) => {
  try {
    const user = req.user;
    let blog;
if(user.role === "admin") {
      blog = await Blog.find()
        .populate("author", "name avatar role")
        .populate("category", "name slug")
        .sort({ created_at: -1 })
        .lean()
        .exec();
    } else {
      blog = await Blog.find({author:user._id})
        .populate("author", "name avatar role")
        .populate("category", "name slug")
        .sort({ created_at: -1 })
        .lean()
        .exec();
    }
    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

//getAllBlog
export const getAllBlog = async (req, res, next) => {
  try {
    const user = req.user;
   
   const blog = await Blog.find()
    .populate("author", "name avatar role")
    .populate("category", "name slug")
    .sort({ created_at: -1 })
    .lean()
    .exec();
    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};


export const getBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .lean()
      .exec();
    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const getRelatedBlog = async (req, res, next) => {
  try {
    const { category, blog } = req.params;
    const categoryData = await Category.findOne({ slug: category });
    if (!categoryData) {
      return next(404, "Category data not found");
    }
    const categoryId = categoryData._id;
    const relatedBlog = await Blog.find({
      category: categoryId,
      slug: { $ne: blog },
    })
      .lean()
      .exec();
    res.status(200).json({
      relatedBlog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getBlogByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const categoryData = await Category.findOne({ slug: category });
    if (!categoryData) {
      return next(404, "Category data not found");
    }
    const categoryId = categoryData._id;
    const blog = await Blog.find({ category: categoryId })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .lean()
      .exec();
    res.status(200).json({
      blog,
      categoryData,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const search = async (req, res, next) => {
  try {
    const { q } = req.query;

    const blog = await Blog.find({ title: { $regex: q, $options: "i" } })
      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .lean()
      .exec();
    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
