import React, { useContext } from 'react';
import {BsArrowLeft} from 'react-icons/bs'
import { ProductsContext } from '../context/ProductsContext';
import AddTocart from './AddTocart';
import { v4 as uuidv4 } from 'uuid';
import { NavLink } from 'react-router-dom';

const CartItems = () => {
  const {state} = useContext(ProductsContext);
    
   
  return (
    <div className='w-11/12 m-auto py-10 relative'>
       <h1 className='text-3xl font-bold'>Shopping Cart</h1>
       <p className='text-sm text-gray-400'>There are {} Items in your cart</p>
       <section className='flex justify-between items-center space-x-10 mt-10'>
        <div className='w-[65%] space-y-3'>
          <table className='w-full'>
            <thead className='border-b text-center'>
              <tr className=''>
                <td className='text-gray-40 py-2 text-left'>Product</td>
                <td className='text-gray-40 py-2 px-4'>Price</td>
                <td className='text-gray-40 py-2 px-4'>Quantity</td>
                <td className='text-gray-40 py-2 px-4'>Total</td>
                <td className='text-gray-40 py-2 px-4'>Delete</td>
              </tr>
            </thead>
            <tbody className='space-y-10 text-center'>
            {state.cartProducts &&  state.cartProducts.map((product) => <AddTocart product={product} key={uuidv4()}/>)}
            </tbody>
            
          </table>
          <NavLink to="/">
           <button className='flex items-center gap-3 text-white bg-blue-400 font-semibold rounded p-2 my-5'>
                <BsArrowLeft/>
                <span>Continue Shopping</span>
           </button>
          </NavLink>
        </div>

        <div className='w-[35%] h-fit border rounded p-5 space-y-2'>
          <div className='flex justify-between items-center border-b border-dotted p-2'>
            <h1 className='text-xl'>Sub Total</h1>
            <p>$200.00</p>
          </div>
          <div className='flex justify-between items-center border-b border-dotted p-2'>
            <h1 className='text-xl'>Discount</h1>
            <p>$20.00</p>
          </div>
          <div className='flex justify-between items-center border-b border-dotted p-2'>
            <h1 className='text-xl'>shipping</h1>
            <p>$200.00</p>
          </div>
          <div className='flex justify-between items-center border-b border-dotted p-2'>
            <h1 className='text-xl'>Sub Total</h1>
            <p>$200.00</p>
          </div>
          <button className='w-full p-2 bg-blue-400 text-center text-white font-bold text-lg rounded'>
              CheckOut
            </button>
        </div>
       </section>
    </div>
  )
}

export default CartItems
