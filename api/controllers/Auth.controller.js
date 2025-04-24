import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // console.log("Register Request:", req.body);
    const checkuser = await User.findOne({ email });
    if (checkuser) {
      return next(handleError(409, "User already registered"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // console.log('Hashed password:', hashedPassword);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({
      success: true,
      message: "Regestration Successfull",
    });
  } catch (error) {
    // console.error("Error during registration:", error);
    next(handleError(500, error.message));
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("Login Request:", req.body);
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return next(handleError(404, "Invalid login credentials"));
    }

    const hashedPassword = user.password;

    const comparePassword = await bcrypt.compare(password, hashedPassword);

    if (!comparePassword) {
      console.log("Password does not match");
      return next(handleError(404, "Invalid login credentials"));
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    res.status(200).json({
      success: true,
      user: newUser,
      message: "Login Successfull",
    });
  } catch (error) {
    console.error("Login Error:", error);
    next(handleError(500, error.message));
  }
};
export const GoogleLogin = async (req, res, next) => {
  try {
    const { name, email, avatar, role } = req.body;
    console.log("Login Request:", req.body);
    let user;
    user = await User.findOne({ email });

    if (!user) {
      const password = Math.random().toString();
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        avatar,
        role: role || "user",
      });

      user = await newUser.save();

      // create new user
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role || "user"
      },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    res.status(200).json({
      success: true,
      user: newUser,
      message: "Login Successfull",
    });
  } catch (error) {
    console.error("Login Error:", error);
    next(handleError(500, error.message));
  }
};

export const Logout = async (req, res, next) => {
  try {
    

    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });


    res.status(200).json({
      success: true,
      message: "Logout Successfull",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
