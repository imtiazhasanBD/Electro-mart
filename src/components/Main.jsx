import React, { useState } from 'react';
import {CiSearch,CiShoppingCart} from 'react-icons/ci'
import Products from './Products';

const Main = () => {
  
  const [search, setSearch] = useState();

  const handleSearch = () => {
      
  }

  return (
    <div className='ml-[80px] relative'>
      <header className=' bg-white flex justify-between items-center px-5 py-2 sticky top-0 z-10'>
        <div className="text-3xl font-bold text-blue-400 ">Electro-mart</div>
        <div className='flex justify-between items-center px-5 py-2 bg-gray-100 rounded'>
            <input onChange={() => {setSearch(event.target.value)}} type="text" value={search} placeholder='Search product' className='bg-transparent outline-0'/>
            <button onClick={() => {handleSearch()}} className='text-blue-400'><CiSearch/></button>
        </div>
        
      </header>
      <Products onSearch={search}/>
    </div>
  )
}

export default Main
