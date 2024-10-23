import React, {useState, useEffect , useContext } from 'react';
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
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import {Helmet} from "react-helmet";

const App = () => {
  const { state } = useContext(ProductsContext);
  const location = useLocation();
  const [pageTitle , setPageTitle] = useState("");

  // State to track if the screen is larger than 768px
  const [isDesktop, setIsDesktop] = useState(window.matchMedia("(min-width: 768px)").matches);

/*     const mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addEventListener("change", (event) => {
        setIsDesktop(event.matches);
    }); */
    
    useEffect(() => {
      const mediaQuery = window.matchMedia("(min-width: 768px)");
  
      // Event listener to update the state on media query change
      const handleMediaChange = (event) => {
        setIsDesktop(event.matches);
      };
  
      // Attach the listener
      mediaQuery.addEventListener("change", handleMediaChange);
  
      // Cleanup listener on component unmount
      return () => {
        mediaQuery.removeEventListener("change", handleMediaChange);
      };
    }, []);
  
  


  // List of paths where the footer should be hidden
  const pathsToHideFooter = ["/user/", "/preview"];

  // Check if the current path matches any path where the footer should be hidden
  const shouldHideFooter = pathsToHideFooter.includes(location.pathname);
  const isProductPreviewPage = location.pathname.includes('/preview/');
  const isUserProfile = location.pathname.includes('/user/');

//handle page title
const isHome = location.pathname;
const homeTitle = 'Online Shopping in World: Order Now from ElectroMart.com';
const handlePageTitle = (title) => {
  setPageTitle(title)   
} 


  return (
    <>
      <Helmet>
        <title>{location.pathname === "/" ? homeTitle : pageTitle}</title>
      </Helmet>

      {<ScrollToTop />}
      {isDesktop? <Header/> : !isUserProfile && <Header/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Card handlePageTitle={handlePageTitle} />} />
        <Route path="/favs" element={<Favorites handlePageTitle={handlePageTitle}/>} />
        <Route path="/orders" element={<Order handlePageTitle={handlePageTitle}/>} />
        <Route path="/preview/:title" element={<ProductPreview handlePageTitle={handlePageTitle}/>} />
        <Route path="/products/search" element={<ProductSearch handlePageTitle={handlePageTitle} />} />
        <Route path="/flash-sales" element={<ProductSearch handlePageTitle={handlePageTitle}/>} />
        <Route path="/products/category/:title" element={<ProductSearch handlePageTitle={handlePageTitle}/>} />
        <Route path="/user/login" element={<UnprotectedRoute><Login/></UnprotectedRoute>}/>
        <Route path="/user/register" element={<UnprotectedRoute><SignUp/></UnprotectedRoute>}/>
        <Route path="/user/:activepage" element={<Protected><Profile  handlePageTitle={handlePageTitle}/></Protected>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/cancel" element={<Cancel/>}/>
      </Routes>
      {!state.isLogin && state.isModelOpen && <Model />}
      {isDesktop? <Footer/>:!isUserProfile && <Footer />}
      {!isProductPreviewPage && <Sidebar />}
    </>
  );
};

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;
