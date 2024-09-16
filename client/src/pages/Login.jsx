import React from 'react'
import SignIn from './SignIn'

const Login = () => {
  return (
    <div className= 'h-screen w-full  flex justify-center items-center bg-gray-200'>
      <div className='w-[100%] h-[100%] bg-slate-100 flex lg:w-[75%] lg:h-[75%] md:w-[75%] md:h-[75%] rounded-lg'>
         <SignIn/>
      </div>
    </div>
  )
}

export default Login