import React, { useContext, useState } from 'react'
import { ProductsContext } from '../context/ProductsContext';

import { FaHeart } from "react-icons/fa"
import {CiSearch,CiShoppingCart} from 'react-icons/ci';
import { FaArrowCircleRight } from "react-icons/fa";
import grocery_banner from '../assets/images/banner_images/FurnitureSale_Banner.jpg'
import { responsive } from './multi_carousel';
import Carousel from "react-multi-carousel";

const FurnitureSale = () => {
    const { state ,dispatch} = useContext(ProductsContext);

        let filtered;

    if(state.products[0]){
         filtered = state.products[0].filter(product =>product.category.toLowerCase().includes('furniture')).sort((a, b) => b.discountPercentage - a.discountPercentage);  
        }
        

  return (
    <div className='bg-white  md:mx-8 my-2  md:block lg:block md:p-4'>
     <span className='flex justify-between items-center text-2xl text-blue-500 font-bold border-b-2  mb-1 pb-1 p-4'>
        <p className='text-black'>Best Furnitures Deals</p>
        <FaArrowCircleRight className='cursor-pointer'/>
     </span>
     <section className='w-full'>
        <img src={grocery_banner} alt="" className='w-full' />
     </section>
            {
                filtered && (
            <Carousel responsive={responsive} className='z-0'>
                  {filtered.map((product) => (
                    
                    <div key={product.id} className=" p-3 relative border-2 border-gray-100">
                      <img src={product.thumbnail} alt="" />
                        <FaHeart className='absolute top-0 right-0 mt-2 mr-2 text-gray-300 hover:text-gray-500 cursor-pointer text-xl'/>
                        <div className='flex flex-col gap-2'>
                            <p className='text-lg md:text-xl font-semibold'>{product.title}</p>
                            <span className='flex gap-2'>
                                <p className="line-through text-gray-500 text-sm md:text-md">${product.price}</p>
                                <p className=" text-red-500 text-sm md:text-md">{product.discountPercentage}%</p>
                            </span>
                            <p className="price text-lg md:text-xl font-bold text-blue-500">${(product.price - (product.price/100 * product.discountPercentage)).toFixed(2)}
                            </p>
                        </div>
                        <CiShoppingCart size={'1.4rem'} className='absolute top-6 right-0 mt-2 mr-2 text-gray-400 cursor-pointer hover:text-gray-600 text-xs'/>
                    </div>
                    ))}
             </Carousel>
                )
            }     
     </div>
   
  )
}

export default FurnitureSale
