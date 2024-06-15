import React from 'react'
import Home from './pages/Home'
import Card from './pages/Card'
import Favorites from './pages/Favorites'
import Order from './pages/Order'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ProductPreview from './pages/ProductPreview'


function App() {

  return (
     
    <BrowserRouter>
    <Sidebar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Card/>}/>
        <Route path='/favs' element={<Favorites/>}/>
        <Route path='/orders' element={<Order/>}/>
        <Route path='/preview/:title' element={<ProductPreview/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App

