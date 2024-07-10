import React, { useEffect, useState, useCallback } from 'react'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";



import img_5 from '../assets/images/slider-image/Grocery-Banner-New-1200x400.jpg';
import img_2 from '../assets/images/slider-image/banner-full.jpg';
import img_3 from '../assets/images/slider-image/slider 1.jpg';
import img_4 from '../assets/images/slider-image/slider 2.jpg';
import img_1 from '../assets/images/slider-image/img_1.jpg';



const Slider = () => {

  const images = [img_1, img_2, img_3, img_4,img_5];
  const [count, setCount] = useState(0);

  const handleRight = useCallback(() => {
    setCount(prev => (prev + 1) % images.length);
  }, [images.length]);

  const handleLeft = useCallback(() => {
    setCount(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
     <div className='w-[95%] m-auto mt-4 bg-white relative overflow-hidden'>
        <div className='flex transition-transform duration-500 ' style={{ transform: `translateX(-${count * 100}%)`}} >
          {images.map((img, i) => <img key={i} className='w-full h-[160px] lg:h-[400px] sm:h-[400px] flex-shrink-0 flex-grow-0' src={img} alt="" />)}
       </div>
       <div className='md:flex top-0 w-full h-full justify-between items-center absolute text-3xl text-white px-5 hidden'>
         <button><FaArrowAltCircleLeft onClick={() => handleLeft()}/></button>
         <button><FaArrowAltCircleRight onClick={() => handleRight()}/></button>
       </div>
       <div className='absolute w-full bottom-2 flex justify-center items-center gap-2'>
         {images.map((img,i) => 
         <button key={i} onMouseOver={() => setCount(i)} className={`md:w-3 md:h-3 h-2 w-2 rounded-full cursor-pointer ${i=== count? 'bg-white' : 'bg-gray-300'} `}></button>)}
       </div>
     </div>
  )
}

export default Slider
