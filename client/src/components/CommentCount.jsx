import { useFetch } from '@/hooks/useFetch';
import React from 'react'
import { FaComments } from "react-icons/fa";
import Loading from './Loading';

const CommentCount = ({props}) => {
      const { data, loading, error } = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}/comment/get-count/${props.blogid}`,
        {
          method: "get",
          credentials: "include",
        }
      );

      if (loading) return <Loading/>
  return (
  <button type='button' className='flex justify-center items-center gap-1'>
    <FaComments/>
    {data && data.commentCount}
  </button>
  )
}

export default CommentCount