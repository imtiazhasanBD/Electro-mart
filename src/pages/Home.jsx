import React from 'react'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import ProductsProvider from '../context/ProductsContext'

const Home = () => {
  return (
    
    <ProductsProvider>
      <div>
        <Main/>
      </div>
    </ProductsProvider>
  )
}

export default Home
