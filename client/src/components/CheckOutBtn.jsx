import React  from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckOutBtn = () => {
  const { cart } = useSelector((state) => state.cartR);

  const handleCheckout = async () => {
    try {
      // Load Stripe instance
      const stripe = await stripePromise;

      // Prepare the request body with the cart products
      const body = {
        products: cart
      };

      // Make a POST request to the backend to create a checkout session
      const response = await fetch("http://localhost:7000/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };

  return (
    <button onClick={handleCheckout} className="w-full p-2 bg-blue-400 text-center text-white font-bold text-lg rounded">
      CheckOut
    </button>
  );
};

export default CheckOutBtn;
