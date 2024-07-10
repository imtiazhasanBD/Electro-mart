import React from 'react'

import Fashion from '../assets/images/catagory_image/fashion.png';
import Computers from '../assets/images/catagory_image/computers.png';
import Electronics from '../assets/images/catagory_image/electronics.png';
import Furnitures  from '../assets/images/catagory_image/furniture.png';
import Accessories  from '../assets/images/catagory_image/electronic_accessories.png';
import Cosmetics  from '../assets/images/catagory_image/cosmetic.png';
import Groceries  from '../assets/images/catagory_image/grocery.png';
import Tools  from '../assets/images/catagory_image/tools.png';
import Sports  from '../assets/images/catagory_image/Sport_balls.svg';

const category_image = {

   Groceries,
   Fashion,
   Mobiles: 'https://shorturl.at/oIyjJ',
   Computers,
   Electronics,
   Furnitures,
   Accessories,
   Cosmetics,
   Tools,
   Sports
}


const CategoryBar = () => {

  return (
    <div className="catagory w-[95%] m-auto mt-4 bg-white flex  space-x-3 px-2 py-2 top-[56px] scrollbar-custom  overflow-auto ">
    { Object.keys(category_image).map((key) => (
      <div key={key} className=' text-black font-bold px-5 py-2 drop-shadow-xl flex justify-center items-center gap-2 flex-col'>
          <div className='bg-gray-100 p-2 md:w-16 md:h-16 w-12 h-12 rounded-full'>
             <img className='w-full h-full' src={category_image[key]} alt="" />
          </div>
          <p className='text-center'>{key}</p>
      </div>
    ))}
 </div>
  )
}

export default CategoryBar
