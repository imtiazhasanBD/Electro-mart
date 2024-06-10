import React from 'react';
import {CiSearch,CiShoppingCart} from 'react-icons/ci'

const Main = () => {
  return (
    <div className='ml-[80px]'>
      <header className='flex justify-between items-center px-5 py-2'>
        <div className="text-3xl font-bold text-blue-400 ">Electro-mart</div>
        <div className='flex justify-between items-center px-5 py-2 bg-gray-100 rounded'>
            <input type="text" placeholder='Search product' className='bg-transparent outline-0'/>
            <button className='text-blue-400' onClick={()=> searchHandler()}><CiSearch/></button>
        </div>
      </header>
    </div>
  )
}

export default Main
