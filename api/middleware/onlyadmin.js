import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const onlyadmin = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return next({ message: "Unauthorized" });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);


    if (decodeToken.role === "admin") {
      req.user = decodeToken;
      next();
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized" });
  }
};
