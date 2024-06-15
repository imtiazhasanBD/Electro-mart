import React, { useContext } from 'react'
import Cartitems from "../components/CartItems"
import { ProductsContext } from '../context/ProductsContext';
const Card = () => {
  
 
  return (
    <div className='ml-[80px]'>
     <Cartitems/>
   </div>
  )
}

export default Card
