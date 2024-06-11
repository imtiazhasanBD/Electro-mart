import React from 'react';
import {CiSearch,CiShoppingCart} from 'react-icons/ci'


const Product = ({product}) => {
   const {id,title, image, description, price, category} = product;
   
  return (
<div className="product h-[300px] bg-white drop-shadow-2xl border p-2 flex flex-col gap-4">
    <img className='image w-full h-[55%] object-cover p-2' src={image} alt="" />
    <div>
    <h1 className='name text-xl font-semibold'>{title.substring(0,15)}</h1>
        <p className='desc text-sm'>{description.substring(0,50) + "..."}</p>
        <div className="price-buy flex justify-between items-center pr-2 mt-2">
            <p className="price text-xl font-bold">${price}</p>
            <CiShoppingCart size={'1.4rem'}/>
        </div>
    </div>
</div>
  )
}

export default Product
