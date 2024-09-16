import React, { useContext } from 'react'
import { ProductsContext } from '../context/ProductsContext';
import {loadStripe} from '@stripe/stripe-js';

const CheckOutBtn = () => {
    const { state } = useContext(ProductsContext);
    
  const handleCheckout = async () => {
     

    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

    const body = {
        products:state.cartProducts
    }
    const headers = {
        "Content-Type":"application/json"
    }
    const response = await fetch("http://localhost:7000/api/create-checkout-session",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    });

    const session = await response.json();


    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });


    if(result.error){
        console.log(result.error);
    }
 }

  return (
    <button onClick={handleCheckout} className="w-full p-2 bg-blue-400 text-center text-white font-bold text-lg rounded">
    CheckOut
  </button>
  )
}

export default CheckOutBtn