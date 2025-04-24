import { handleError } from "../helpers/handleError.js";
import Category from "../models/category.model.js";

export const addCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const category = new Category({
      name,
      slug,
    });

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category Added successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const showCategory = async (req, res, next) => {
  try {
    const { category_id } = req.params;
    const category = await Category.findById(category_id);
    if (!category) {
      return next(handleError(404, "Data not found !"));
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const { category_id } = req.params;
    const category = await Category.findByIdAndUpdate(category_id, {
      name, slug
    }, {new: true });

    res.status(200).json({
      success: true,
      message: "Category Updated successfully",
      category
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { category_id } = req.params;
   await Category.findByIdAndDelete(category_id);

    res.status(200).json({
      success: true,
      message: "Category Deleted successfully"
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    const category = await Category.find().sort({ name: 1 }).lean().exec();
    res.status(200).json({
      category,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
