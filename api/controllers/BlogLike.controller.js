import { handleError } from "../helpers/handleError.js";
import BlogLike from "../models/bloglike.model.js";

// POST: Like or Unlike a blog post
export const doLike = async (req, res, next) => {
  try {
    const { userid, blogid } = req.body;

    // Check if the user has already liked the blog
    const existingLike = await BlogLike.findOne({ userid, blogid });
    let isLiked = false;

    if (!existingLike) {
      // If not liked yet, save new like
      const newLike = new BlogLike({ userid, blogid });
      await newLike.save();
      isLiked = true;
    } else {
      // If already liked, remove the like (toggle)
      await BlogLike.findByIdAndDelete(existingLike._id);
    }

    // Get updated like count
    const likecount = await BlogLike.countDocuments({ blogid });

    res.status(200).json({
      likecount,
      isLiked, // true if liked now, false if unliked
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// GET: Get total like count and user's like status
export const likeCount = async (req, res, next) => {
  try {
    const { blogid, userid } = req.params;

    // Count total likes on blog
    const likecount = await BlogLike.countDocuments({ blogid });

    // Default like status
    let isUserLiked = false;

    // Check if the current user has liked the post
    if (userid) {
      const getUserLike = await BlogLike.countDocuments({ blogid, userid });
      isUserLiked = getUserLike > 0;
    }

    res.status(200).json({
      likecount,
      isUserLiked
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
