import React, { useContext } from 'react';
import {AiFillDelete} from 'react-icons/ai'
import { ProductsContext } from '../context/ProductsContext';

const AddTocart = ({product}) => {
  const {id,title, image, description, price, category} = product;

  const { state ,dispatch} = useContext(ProductsContext);

  const removeProduct = () => {
      dispatch({type: "REMOVE_FROM_CART" , payload: id})
  }

  return (
 
    <tr className='border-dotted border-b '>
      <td className='flex items-center space-x-3 py-5'>
        <img src={image} className='w-[100px] h-[100px] border rounded py-3'/>
        <div>
          <h1 className='text-lg font-bold'>{title.substring(0,30) + "..."}</h1>
          <p>{description.substring(0,40) + "..."}</p>
        </div>
      </td>
      <td>${price}</td>
      <td>10</td>
      <td>$1010</td>
      <td>
        <button className='hover:text-blue-400 active:text-red-500' onClick={() => {removeProduct()}}>
            <AiFillDelete size={"1.5rem"}/>
        </button>
      </td>
    </tr>
 
  
  )
}

export default AddTocart
