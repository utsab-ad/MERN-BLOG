import BlogCard from '@/components/BlogCard'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { useSearchParams } from 'react-router-dom'


const SearchResults = () => {
    const [searchParams] = useSearchParams()
    const q = searchParams.get('q')

      const {
           data: blogData,
           loading,
           error,
         } = useFetch(`${import.meta.env.VITE_API_BASE_URL}/blog/search?q=${q}`, {
           method: "get",
           credentials: "include",
}, [q])


  return (
    <>
    
     <div className='flex gap-2 items-center text-2xl font-bold text-violet-500 border-b pb-3 mb-2'>
                <h4>Search result for {q}</h4>
    
            </div>
            
           <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
             {blogData && blogData?.blog.length > 0 ? 
             
             blogData.blog.map(blog => <BlogCard key={blog._id} props={blog} />)
             
             : 
             
             <div>Data not found</div>}
           </div>
    </>
  )
}

export default SearchResults