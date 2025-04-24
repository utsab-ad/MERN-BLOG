import { showToast } from '@/helpers/showToast';
import { useFetch } from '@/hooks/useFetch';
import React, { useEffect, useState } from 'react'
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';

const LikeCount = ({ props }) => {
  const [likeCount, setLikeCount] = useState(0);        // Stores total like count
  const [hasLiked, setHasLiked] = useState(false);      // Indicates if the user has liked the post
  const user = useSelector(state => state.user);         // Getting user from redux

  // Custom hook to fetch like count and like status of the user
  const { data: blogLikeCount, loading, error } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}/blog-like/get-like/${props.blogid}/${user && user.isLoggedIn ? user.user._id : ''}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  // Sync fetched data to state
  useEffect(() => {
    if (blogLikeCount) {
      setLikeCount(blogLikeCount.likecount);
      setHasLiked(blogLikeCount.isUserLiked);
    }
  }, [blogLikeCount]);

  // Handle like/unlike
  const handleLike = async () => {
    try {
      if (!user.isLoggedIn) {
        return showToast('error', 'Please login into your account');
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/blog-like/do-like`, {
        method: "POST",
        credentials: 'include',
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify({ userid: user.user._id, blogid: props.blogid })
      });

      if (!response.ok) {
        return showToast('error', response.statusText);
      }

      const responseData = await response.json();
      setLikeCount(responseData.likecount);       // Update count
      setHasLiked(responseData.isLiked);          // Update liked status

    } catch (error) {
      showToast('error', error.message);
    }
  }

  return (
    <button onClick={handleLike} type='button' className='flex justify-center items-center gap-1'>
      {!hasLiked ? <FaRegHeart /> : <FaHeart className="text-red-500" />}
      {likeCount}
    </button>
  )
}

export default LikeCount;
