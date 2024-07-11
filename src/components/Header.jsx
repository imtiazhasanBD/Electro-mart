import React, {useContext, useState } from 'react';
import {CiSearch,CiShoppingCart} from 'react-icons/ci'
import { ProductsContext } from '../context/ProductsContext';

import { IoHeartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { BsCart3 } from "react-icons/bs";
import { NavLink } from 'react-router-dom';




const Header = () => {
    const [search, setSearch] = useState('');
    const { state ,dispatch} = useContext(ProductsContext);

      // product search from home
  const handleSearch = () => {
    const filtered = state.products[0].filter(product =>product.title.toLowerCase().includes(search.toLowerCase())
    );
    dispatch({type: "PRODUCT_FILTER", payload: filtered})
  }



  return (
    <header className=' bg-blue-500 flex justify-between sm:gap-10 items-center sm:px-12 py-3 sticky top-0 z-10 px-5'>
        <NavLink to="/">
            <div className="md:text-3xl sm:text-md text-xl font-bold text-white hidden sm:block">Electro-mart</div>
        </NavLink>
        <div className='flex justify-between items-center px-5 py-2 bg-gray-100 rounded sm:w-[60%] w-full'>
            <input onChange={() => setSearch(event.target.value)} type="text" value={search}  placeholder='Search product' className='bg-transparent outline-0'/>
            <button onClick={() => {handleSearch()}} className='text-blue-600 font-bold text-lg'><CiSearch/></button>
        </div>
        <div className=' gap-8 justify-center items-center text-lg text-white font-bold hidden sm:flex'>
          <NavLink to="/user">
            <button className='flex justify-center items-center gap-2 text-sm'>
             {!state.avatar? <CgProfile className='text-3xl'/> :   <img src= {state.avatar} className='w-8 h-8 rounded-full' />}Account
            </button>
          </NavLink>

          <NavLink to="favs">
            <button className='flex justify-center items-center gap-2 text-sm'>
              <span className='relative'>
              <IoHeartOutline className='text-2xl'/> 
              {state.favoriteProducts.length > 0 && 
            <span className='px-1 bg-red-500 rounded-full text-xs absolute bottom-3 left-3'>{state.favoriteProducts.length}</span>}
              </span>
            </button>
          </NavLink>

          <NavLink to="cart">
            <button className='flex justify-center items-center gap-2 text-sm'>
              <span className='relative'>
              <BsCart3 className='text-2xl'/> 
              {state.cartProducts.length > 0 && 
            <span className='px-1 bg-red-500 rounded-full text-xs absolute bottom-3 left-3'>{state.cartProducts.length}</span>}
              </span> Cart
            </button>
          </NavLink>
         


        </div>
        
   </header>
  )
}

export default Header;
