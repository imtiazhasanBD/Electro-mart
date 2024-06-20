import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ProductsContext } from '../context/ProductsContext';
import Product from '../components/Product';
import { v4 as uuidv4 } from 'uuid';
import Rating from '../components/Rating';
import { toast } from 'react-toastify';


const ProductPreview = () => {
 
   const location = useLocation();
   const  {id,title, image, description, price, category, rating} = location.state.product;
   const { state ,dispatch} = useContext(ProductsContext);
   const [activeTab, setActiveTab] = useState('description');


// Related Products Add
  useEffect(() => {
    const relatedProducts = state.products[0].filter(product =>product.category.toLowerCase().includes(category.toLowerCase()) && product.id !== id);
    dispatch({type: "RELETER_PRODUCTS", payload: relatedProducts});
  }, [category, id])
  

  // Product AddToCart 
  const AddToCart = () => {
    dispatch({type: "ADD_TO_CART", payload: {product: location.state.product, quantity: 1}});
    toast.success("The product has been added to the cart");
   } 

   
// Product Add To Wishlist
   const AddToFavorite = () => {
      const product = location.state.product;
      
      if (!state.favoriteProducts.some(product => product.id === id)) {
        dispatch({ type: "ADD_TO_FAVORITES", payload: product });
        toast.success("The product has been added to the wishlist");
      } else {
        toast.warning("Already in Wishlist");
      }
   } 



  return (
    <div className="ml-[70px] flex justify-center px-4 sm:px-8 md:px-12 lg:px-20 py-10">
      <div className="max-w-screen-lg w-full">
        <div className="path-link mb-6 text-gray-600 text-sm">
         <Link to="/"><span className="hover:text-blue-500 cursor-pointer">Home</span></Link> / 
          <span className="hover:text-blue-500 cursor-pointer"> {category}</span> / 
          <span className="text-blue-500"> {title}</span>
        </div>

        <section className="product-item grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product image */}
          <div className="products-image relative bg-white shadow-lg rounded-lg h-[70vh] flex flex-col justify-between p-5">
            <img src={image} alt={title} className="w-full h-[100%]  rounded-md mb-4" />
            
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <img key={i} src={image} alt={`Thumbnail ${i}`} className="h-[60px] w-[60px] object-cover rounded-md cursor-pointer hover:ring-2 hover:ring-blue-500" />
              ))}
            </div>
          </div>

          {/* Product details */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-3xl font-bold">{title}</h1>
            <Rating rating={rating.rate} count={rating.count} />
            <div className="text-4xl font-semibold text-blue-600">${price}</div>
            <p className="text-gray-700 leading-relaxed">{description.length > 310? description.substring(0,345) + "..." : description}</p>

            {/* Add to cart and wishlist buttons */}
            <div className="space-x-4 flex font-bold">
              <button onClick={() => {AddToCart()}} className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out">
                Add To Cart
              </button>
              <button onClick={() => AddToFavorite()} className="bg-gray-300 text-gray-800 py-3 px-6 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none transition duration-300 ease-in-out">
                Add To Wishlist
              </button>
            </div>
            <p className="text-md font-semibold">
              <span className='text-gray-600'>Category: </span> 
              <span className='text-blue-500'>{category}</span></p>
          </div>
        </section>

        {/* Details and related products sections */}
        <section className="details mb-12">
          <div className="flex flex-col">
            <div className="flex space-x-8 border-b pb-2 mb-6 font-bold">
              <div 
                className={`cursor-pointer ${activeTab === 'description' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'} hover:text-blue-500`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </div>
              <div 
                className={`cursor-pointer ${activeTab === 'additionalInfo' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'} hover:text-blue-500`}
                onClick={() => setActiveTab('additionalInfo')}
              >
                Additional information
              </div>
              <div 
                className={`cursor-pointer ${activeTab === 'reviews' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'} hover:text-blue-500`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({rating.count})
              </div>
            </div>
            <div>
              {activeTab === 'description' && <p>{description} <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, labore. Illo magnam perspiciatis dolore repellendus et pariatur mollitia ab inventore error iusto enim odit veritatis deserunt, dolorem nihil debitis rem libero nesciunt sequi placeat fugit architecto quo nobis. Expedita at magni asperiores, officiis sit sunt provident magnam cum repudiandae ex dolorum, ullam dicta similique nobis quae quia impedit. Ipsa sit non aperiam. Dignissimos dolorem nam tempora ipsa, cumque sequi hic illo explicabo debitis nesciunt? Error, doloribus soluta? Optio at vel architecto cupiditate id laborum quasi numquam inventore quaerat aliquam, aperiam autem sequi! Cumque nihil repellat dignissimos eius officiis dicta? Corrupti?</p>}
              {activeTab === 'additionalInfo' && <p>Here you can add additional information about the product. For instance, technical specifications, dimensions, etc.</p>}
              {activeTab === 'reviews' && <p>Customer reviews and ratings will be displayed here.</p>}
          </div>
          </div>
        </section>

        <section className="related-products">
          <h2 className="text-2xl font-bold mb-6 border-b-2 border-b-blue-400 pb-2">Related Products</h2>

          {/* Releted Products Add section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {state.relatedProducts[0] &&  state.relatedProducts[0].map((product) => <Product product={product} key={uuidv4()}/>)}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductPreview;