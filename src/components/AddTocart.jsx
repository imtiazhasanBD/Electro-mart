import React, { useContext } from 'react';
import {AiFillDelete} from 'react-icons/ai'
import { ProductsContext } from '../context/ProductsContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddTocart = ({product}) => {
  const {id,quantity,title, thumbnail, description, price, category,rating, discountPercentage} = product;
  const { state ,dispatch} = useContext(ProductsContext);

  // Remove Product from Cart
  const removeProduct = () => {
      dispatch({type: "REMOVE_FROM_CART" , payload: id});
      toast.info("The item has been removed from the cart");
  }

  return (
 
    <tr className='border-dotted border-b '>
      <td className='flex items-center space-x-3 py-5'>
      <Link to={`/preview/${title}`} state={{product}}>
      <img className='w-[90px] h-[100px] border rounded py-3' src={thumbnail} alt="" />
      </Link>
        <div>
          <h1 className='text-lg font-bold'>{title.substring(0,30) + "..."}</h1>
          <p>{description.substring(0,40) + "..."}</p>
        </div>
      </td>
      <td>${(price - (price/100 * discountPercentage)).toFixed(2)}</td>
      <td>{quantity}</td>
      <td>${((price - (price/100 * discountPercentage))*quantity).toFixed(2)}</td>
      <td>
        <button className='hover:text-blue-400 active:text-red-500' onClick={() => {removeProduct()}}>
            <AiFillDelete size={"1.5rem"}/>
        </button>
      </td>
    </tr>
 
  
  )
}

export default AddTocart
