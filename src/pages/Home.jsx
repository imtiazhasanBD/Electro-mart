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

import grocery_banner from '../assets/images/banner_images/banner-mobile.jpg'

const Home = () => {

  const { state ,dispatch} = useContext(ProductsContext);
  
  
  return (
    
    <div className='relative'>
      <Slider/>
      <CategoryBar/>
      <FlashSale/>
      <PerfumeTopDeals/>
      <section className='w-full md:px-8'>
        <img src={grocery_banner} alt="" className='w-full' />
      </section>
      {( !state.products[0])? <LoadingScreen/> :
      <Products/>}
    </div>
  )
}

export default Home
