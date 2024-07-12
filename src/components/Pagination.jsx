import React from 'react'
import { NavLink } from 'react-router-dom';

const Pagination = ({totalPosts, postsPerPage, setCurrentPage, currentPage}) => {
    let pages = [];

    for (let a = 1; a <= Math.ceil(totalPosts/postsPerPage); a++){
            pages.push(a);
    }

  return (
    <div>
        <div className='pagination flex gap-5 font-bold bg-white w-full p-4 justify-center items-center'>
        {pages.map((num,i) => (
            <button onClick={() => setCurrentPage(num)} key={i} className={` border-2 rounded-md py-2 px-4 ${currentPage === num? `bg-blue-500 text-white` : `bg-white`}` }>{num}</button>))}
        </div>

        <p>{`Products from ${currentPage*postsPerPage-postsPerPage == 0? (currentPage*postsPerPage-postsPerPage) +1 : currentPage*postsPerPage-postsPerPage} to ${currentPage*postsPerPage} of ${totalPosts}`}</p>
     
    </div>
  )
}

export default Pagination