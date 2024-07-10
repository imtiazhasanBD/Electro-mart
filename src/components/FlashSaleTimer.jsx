import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const FlashSaleTimer = () => {
  const calculateTimeLeft = () => {
    const now = dayjs();
    const endOfDay = dayjs().endOf('day');
    const totalTime = endOfDay.diff(now);

    return {
      hours: String(Math.floor((totalTime / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
      minutes: String(Math.floor((totalTime / 1000 / 60) % 60)).padStart(2, '0'),
      seconds: String(Math.floor((totalTime / 1000) % 60)).padStart(2, '0'),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <section className=' flex items-center justify-center gap-4 w-full text-center bg-blue-500 p-4 text-white font-semibold md:w-full md:m-auto md:bg-white md:text-xl'>
        <p className='md:text-black md:font-bold'>Ending in</p>
        <p className='bg-white py-1 px-2 text-black font-bold md:bg-blue-500 md:text-white'>{timeLeft.hours}</p>
        <p className='bg-white py-1 px-2 text-black font-bold md:bg-blue-500 md:text-white'>{timeLeft.minutes}</p>
        <p className='bg-white py-1 px-2 text-black font-bold md:bg-blue-500 md:text-white'>{timeLeft.seconds}</p>
   </section>

    
  );
};

export default FlashSaleTimer;
