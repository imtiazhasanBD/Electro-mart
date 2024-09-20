import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-y-3 bg-white text-center px-2">
        <div className="flex justify-center h-60">
            <img src= "https://shorturl.at/BWmtn" className="h-full w-full"/>
        </div>
        <h1 className="text-3xl font-bold mb-4">Payment Canceled</h1>
        <p className="text-gray-600 mb-8">Your payment was not completed. Please try again or continue shopping.</p>
        <Link to="/">
          <button className="bg-blue-500 text-white  w-52 h-12 rounded-full lg:text-base font-semibold text-sm ">
            CONTINUE SHOPPING
          </button>
       </Link>
  </div>
  )
}

export default Cancel