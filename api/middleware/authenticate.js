import jwt from "jsonwebtoken";
export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return next({ message: "Unauthorized - No token" });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodeToken;

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
