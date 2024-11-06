import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { IoRemoveOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify"
import { useAddToCart } from "./useAddToCart";
import { useDispatch, useSelector } from "react-redux";
import { RemoveFromCart, RemoveQuantity } from "../features/cart/cartSlice";
import { setModel } from "../features/genaralSlice";


const AddTocartMobile = ({product}) => {
    const { id,quantity,title,thumbnail,description,price,category,rating,discountPercentage,brand} = product;
    
    const dispatch = useDispatch();
    const { isLogin } = useSelector((state) => state.genaralSliceR);

        // Remove Product from Cart
        const removeProduct = (id) => {
            dispatch(RemoveFromCart(id))
            toast.info("The item has been removed from the cart");
          };
      
        // Product Add To Cart
        const addToCart = useAddToCart();
      
        //Remove Product quqntity
      
        const removeQuantity = () => {
          if (isLogin && product.quantity > 1) {
            dispatch(RemoveQuantity(id))
            toast.info("The item quantity has been removed");
        } else {
            dispatch(setModel(true));
            dispatch(setLoading(false))
        }
        }




  return (
    <div className="flex gap-4 py-6 sm:py-10">
    <Link to={`/preview/${title}`} state={{ product }}>
      <img
        src={thumbnail}
        alt={title}
        className="h-24 w-24 rounded-md object-cover object-center border border-skyText/30 hover:border-skyText duration-300"
      />
    </Link>
    <section className="relative pr-9 flex flex-col gap-1 w-full">
      <h1 className="text-base font-semibold">{title}</h1>
      <p className="text-sm">{description.substring(0, 40) + '...'}</p>
      <p className="text-xs">Category: {category}</p>
      <p className="text-xs">
        Brand: {typeof brand === 'undefined' ? 'No Brand' : brand}
      </p>
      <div className="flex items-center gap-8 pt-2">
        <span>
          <p className="line-through text-gray-400">${price.toFixed(2)}</p>
          <p className="text-lg font-semibold">
            ${(price - (price / 100) * discountPercentage).toFixed(2)}
          </p>
        </span>
        <span className="flex items-center gap-2">
          <button className={`bg-[#f7f7f7]  p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-base hover:bg-white duration-200 cursor-pointer ${quantity == 1? 'text-gray-300' : 'text-black'}`}>
            <IoRemoveOutline onClick={() => removeQuantity()}/>
          </button>
          <p>{quantity}</p>
          <button className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-base hover:bg-white duration-200 cursor-pointer">
            <IoMdAdd onClick={() => addToCart(product)}/>
          </button>
        </span>
      </div>
      <button
        className="absolute top-0 right-0 text-lg"
        onClick={() => removeProduct(id)}
      >
        <RxCross2 className="inline-flex text-gray-600 hover:text-red-600" />
      </button>
    </section>
  </div>
  )
}

export default AddTocartMobile