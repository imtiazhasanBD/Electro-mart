import React, { useContext, useEffect, useState} from 'react';
import Product from './Product';
import { v4 as uuidv4 } from 'uuid';
import { ProductsContext } from '../context/ProductsContext';


const Products = () => {

const { state ,dispatch} = useContext(ProductsContext);

  return (
   
    <div>
       <div className="catagory bg-white flex w-full space-x-8 px-2 py-10 sticky top-[56px] z-10">
         <h1 className='bg-blue-400 text-white font-bold px-5 py-2 rounded-full drop-shadow-xl'>All</h1>
         <h1 className='bg-blue-400 text-white font-bold px-5 py-2 rounded-full drop-shadow-xl'>Watch</h1>
         <h1 className='bg-blue-400 text-white font-bold px-5 py-2 rounded-full drop-shadow-xl'>Laptop</h1>
         <h1 className='bg-blue-400 text-white font-bold px-5 py-2 rounded-full drop-shadow-xl'>Mobile</h1>
         <h1 className='bg-blue-400 text-white font-bold px-5 py-2 rounded-full drop-shadow-xl'>Laptop</h1>
         <h1 className='bg-blue-400 text-white font-bold px-5 py-2 rounded-full drop-shadow-xl'>Laptop</h1>
           
       </div>

       <div className="products grid grid-cols-1 xl:grid-cols-5 md:grid-cols-3 gap-9 p-4 z-20">
         {state.products[0] &&  state.products[0].map((product) => <Product product={product} key={uuidv4()}/>)}
       </div>
    </div>
  )
}

export default Products
