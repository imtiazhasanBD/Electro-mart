import React, {useContext, useState } from 'react';
import {CiSearch,CiShoppingCart} from 'react-icons/ci'
import { ProductsContext } from '../context/ProductsContext';
import Products from '../components/Products'
import LoadingScreen from '../components/LoadingScreen';
import Header from '../components/Header';
import Slider from '../components/Slider';
import CategoryBar from '../components/CategoryBar';
import FlashSale from '../components/FlashSale';
import PerfumeTopDeals from '../components/PerfumeTopDeals';

import GroceriesSale from '../components/GroceriesSale';
import FurnitureSale from '../components/FurnitureSale';

const Home = () => {

  const { state ,dispatch} = useContext(ProductsContext);
  
  
  return (
    
    <div className='relative'>
      <Slider/>
      <CategoryBar/>
      <FlashSale/>
      <PerfumeTopDeals/>
      <FurnitureSale/>
      {( !state.products[0])? <LoadingScreen/> :
      <Products/>}
      <GroceriesSale/>
    </div>
  )
}

export default Home
