import React from 'react'
import { useLocation } from 'react-router-dom'

const ProductPreview = () => {

   const location = useLocation();
   const  {id,title, image, description, price, category} = location.state;

  return (
    <div className='ml-[80px]'>
       <h1>{title}</h1>
       <img className='  max-h-72' src={image} alt="" />
       <p>{price}</p>
       <p>{category}</p>
       <p>{description}</p>
    </div>
  )
}

export default ProductPreview
