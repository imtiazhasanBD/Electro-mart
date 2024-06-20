import React, {useContext, useState } from 'react';
import {CiSearch,CiShoppingCart} from 'react-icons/ci'
import { ProductsContext } from '../context/ProductsContext';
import Products from '../components/Products'

const Home = () => {

  const { state ,dispatch} = useContext(ProductsContext);
  const [search, setSearch] = useState('');

  // product search from home
  const handleSearch = () => {
    const filtered = state.products[0].filter(product =>product.title.toLowerCase().includes(search.toLowerCase())
    );
    dispatch({type: "PRODUCT_FILTER", payload: filtered})
    setSearch("");
  }



  return (
    <div className='ml-[80px] relative'>
      <header className=' bg-white flex justify-between items-center px-5 py-2 sticky top-0 z-10'>
        <div className="md:text-3xl sm:text-md text-xl font-bold text-blue-400 ">Electro-mart</div>
        <div className='flex justify-between items-center px-5 py-2 bg-gray-100 rounded'>
            <input onChange={() => setSearch(event.target.value)} type="text" value={search}  placeholder='Search product' className='bg-transparent outline-0'/>
            <button onClick={() => {handleSearch()}} className='text-blue-400'><CiSearch/></button>
        </div>
        
      </header>
      <Products/>
    </div>
  )
}

export default Home
