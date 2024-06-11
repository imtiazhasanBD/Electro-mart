import React from 'react';
import {AiFillDelete} from 'react-icons/ai'
import {BsArrowLeft} from 'react-icons/bs'
import { ProductsContext } from '../context/ProductsContext';

const CartItems = () => {


  return (
    <div className='w-11/12 m-auto py-10'>
       <h1 className='text-3xl font-bold'>Shopping Cart</h1>
       <p className='text-sm text-gray-400'>There are 1 Items in your cart</p>
       <section className='flex justify-between items-center space-x-10 mt-10'>
        <div className='w-[60%] space-y-3'>
          <table className='w-full'>
            <thead className='border-b text-center'>
              <tr>
                <td className='text-gray-40 py-2 text-left'>Product</td>
                <td className='text-gray-40 py-2'>Price</td>
                <td className='text-gray-40 py-2'>Quantity</td>
                <td className='text-gray-40 py-2'>Total</td>
                <td className='text-gray-40 py-2'>Delete</td>
              </tr>
            </thead>

            <tbody className='space-y-10 text-center'>
              <tr className='border-dotted border-b '>
                <td className='flex items-center space-x-3 py-5'>
                  <img src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className='w-[100px] h-[100px] border rounded py-3'/>
                  <div>
                    <h1 className='text-xl font-bold'>Glass</h1>
                    <p>Lorem, ipsum.</p>
                  </div>
                </td>
                <td>$562</td>
                <td>10</td>
                <td>$1010</td>
                <td>
                  <button>
                      <AiFillDelete size={"1.5rem"}/>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
           <button className='flex items-center gap-3 text-white bg-blue-400 font-semibold rounded p-2 my-5'>
                <BsArrowLeft/>
                <span>Continue Shopping</span>
           </button>
        </div>

        <div className='w-[40%] h-fit border rounded p-5 space-y-2'>
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
