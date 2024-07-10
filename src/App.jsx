import React, { useContext } from 'react'
import Home from './pages/Home'
import Card from './pages/Card'
import Favorites from './pages/Favorites'
import Order from './pages/Order'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ProductPreview from './pages/ProductPreview'
import Model from './components/Model'
import { ProductsContext } from './context/ProductsContext'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Header from './components/Header'
import CartItems from './components/CartItems'


function App() {

  const {state} = useContext(ProductsContext)

  return (
     
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<CartItems/>}/>
        <Route path='/favs' element={<Favorites/>}/>
        <Route path='/orders' element={<Order/>}/>
        <Route path='/preview/:title' element={<ProductPreview/>}/>
        <Route path='/user/register'element={<SignUp/>} />
        <Route path='/user'element={<Profile/>} />
      </Routes>
      {!state.isLogin && (state.isModelOpen && <Model/>)}
      <Sidebar/>
    </BrowserRouter>

  )
}

export default App

