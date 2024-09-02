import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Card from './pages/Card';
import Favorites from './pages/Favorites';
import Order from './pages/Order';
import Sidebar from './components/Sidebar';
import ProductPreview from './pages/ProductPreview';
import Model from './components/Model';
import { ProductsContext } from './context/ProductsContext';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProductSearch from './components/ProductSearch';
import Protected from './components/Protected';
import SignIn from './pages/SignIn';
import Login from './pages/Login';
import UnprotectedRoute from './components/UnprotectedRoute';

const App = () => {
  const { state } = useContext(ProductsContext);
  const location = useLocation();

  
  // List of paths where the footer should be hidden
  const pathsToHideFooter = [];

  // Check if the current path matches any path where the footer should be hidden
  const shouldHideFooter = pathsToHideFooter.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Card />} />
        <Route path="/favs" element={<Favorites />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/preview/:title" element={<ProductPreview />} />
        <Route path="/search/:title" element={<ProductSearch />} />
        <Route path="/user/login" element={<UnprotectedRoute><Login/></UnprotectedRoute>} />
        <Route path="/user/register" element={<UnprotectedRoute><SignUp/></UnprotectedRoute>} />
        <Route path="/user" element={<Protected><Profile/></Protected>} />
      </Routes>
      {!state.isLogin && state.isModelOpen && <Model />}
      {!shouldHideFooter && <Footer />}
      <Sidebar />
    </>
  );
};

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;
