import cloudinary from "../config/cloudinary.js";
import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const user = await User.findOne({ _id: userid }).lean().exec();
    if (!user) {
      next(handleError(404, "User not Found"));
    }
    res.status(200).json({
      success: true,
      message: "User data found.",
      user,
    });
  } catch (error) {
    next(handleError(500, error.messsage));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    const { userid } = req.params;

    const user = await User.findById(userid);

    user.name = data.name;
    user.email = data.email;
    user.bio = data.bio;
    if (data.password && data.password.length >= 8) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      user.password = hashedPassword;
    }

    if (req.file) {
      // Upload an image
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, { folder: "U-Blog", resource_type: "auto" })
        .catch((error) => {
          next(handleError(500, error.message));
        });

      user.avatar = uploadResult.secure_url;
    }

    await user.save();

    const userObj = user.toObject();
    delete userObj.password;
    console.log("Updated user from backend:", userObj);

    res.status(200).json({
      success: true,
      message: "Data Uploaded.",
      user: userObj,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const user = await User.find().sort({createdAt: -1})
    res.status(200).json({
      success: true,
      user
    })
    
  } catch (error) {
    next(handleError(500, error.message));
    
  }
}
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)
    res.status(200).json({
      success: true,
      message: 'Data deleted'
    })
    
  } catch (error) {

    next(handleError(500, error.message));
    
  }
}