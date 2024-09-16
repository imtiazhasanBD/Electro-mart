import React from 'react'
import { Puff } from 'react-loader-spinner';

const LoadingScreen = () => {

 return <div className='w-full h-full bg-white/80 absolute top-0 left-0 flex flex-col gap-1 items-center justify-center'>
  <Puff
  visible={true}
  height="80"
  width="80"
  color="#3b82f6"
  ariaLabel="puff-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
 </div>;
}

export default LoadingScreen
