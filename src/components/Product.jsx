import React, { useContext, useEffect } from 'react';
import {CiSearch,CiShoppingCart} from 'react-icons/ci';
import { ProductsContext } from '../context/ProductsContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Product = ({product}) => {
  const {id,title, image, description, price, category, rating} = product;
  const { state ,dispatch} = useContext(ProductsContext);

  // Product Add To Cart
   const AddToCart = () => {
    dispatch({type: "ADD_TO_CART", payload: {product: product, quantity: 1}});
    toast.success("The product has been added to the cart");
    
   } 

  

  return (
<div className="product h-[300px] bg-white drop-shadow-2xl border p-2 flex flex-col gap-4">
    <div className='h-[50%]'>
    <Link to={`/preview/${title}`} state={{product}}>
      <img className='image w-full h-[100%] object-cover p-2' src={image} alt="" />
      </Link>
    </div>
    <div>
        <h1 className='name text-lg font-semibold'>{title.substring(0,15)}</h1>
        <p className='desc text-sm'>{description.substring(0,50) + "..."}</p>
        <div className="price-buy flex justify-between items-center pr-2 mt-2">
            <p className="price text-xl font-bold">${price.toFixed(2)}</p>
            <CiShoppingCart size={'1.4rem'} onClick={() => {AddToCart()}}/>
        </div>
    </div>
</div>
  )
}

export default Product
