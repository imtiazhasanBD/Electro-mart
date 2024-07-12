import React, { useContext, useEffect } from 'react';
import {CiSearch,CiShoppingCart} from 'react-icons/ci';
import { ProductsContext } from '../context/ProductsContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa"
import { useAddToCart } from './useAddToCart';
import { useAddToFavs } from './useAddToFavs';


const Product = ({product}) => {
  const {id,title, images, description, price, category, rating, thumbnail, discountPercentage} = product;
  const { state ,dispatch} = useContext(ProductsContext);

  // Product Add To Cart
  const addToCart = useAddToCart();

  // Product Add To Wishlist
 const addTofavs = useAddToFavs();

  return (
<div className="product h-[300px] bg-white drop-shadow-sm border p-2 flex flex-col gap-4">
    <div className='h-[50%]'>
    <Link to={`/preview/${title}`} state={{product}}>
      <img className='image w-full h-[100%] object-cover p-2' src={thumbnail} alt="" />
    </Link>
       <p className='absolute top-0 bg-gray-200 text-sm font-bold  p-1 mt-1'>save {discountPercentage}%</p>
       <FaHeart onClick={()=> addTofavs(product)} className='absolute top-0 right-0 mt-2 mr-2 text-gray-300 hover:text-gray-500 cursor-pointer' />
    </div>
    <div>
        <h1 className='name text-lg font-semibold'>{title.substring(0,15)}</h1>
        <p className='desc text-sm'>{description.substring(0,50) + "..."}</p>
        <div className="price-buy flex justify-between items-center pr-2 mt-2">
            <div className='flex gap-1 items-center'>
              <p className="line-through text-gray-500 text-sm">${price}</p>
              <p className="price text-xl font-bold">${(price - (price/100 * discountPercentage)).toFixed(2)}</p>
            </div>
            <CiShoppingCart size={'1.4rem'} onClick={() => addToCart(product)} className='cursor-pointer hover:text-gray-500'/>
        </div>
    </div>
</div>
  )
}

export default Product
