import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
const { state } = useContext(ProductsContext);

const Success = () => {
    const { state ,dispatch } = useContext(ProductsContext);
    const location = useLocation();
    const navigate = useNavigate();
    const sessionId = new URLSearchParams(location.search).get("session_id");

    console.log(sessionId)

    useEffect(() => {
      if(!sessionId) {
        navigate("/");
      } 
    }, [sessionId])

  return (
    <div className='mt-96'>Success</div>
  )
}

export default Success