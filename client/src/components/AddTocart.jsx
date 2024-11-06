import React, { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IoRemoveOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useAddToCart } from "./useAddToCart";
import { useDispatch, useSelector } from "react-redux";
import { RemoveFromCart, RemoveQuantity } from "../features/cart/cartSlice";
import { setLoading, setModel } from "../features/genaralSlice";


const AddTocart = ({ product }) => {
  const {
    id,
    quantity,
    title,
    thumbnail,
    description,
    price,
    category,
    rating,
    discountPercentage,
    brand,
    shippingInformation
  } = product;
  
  const { isItLoading ,isLogin} = useSelector((state) => state.genaralSliceR);
  const dispatch = useDispatch();
  // Remove Product from Cart
  const removeProduct = () => {
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
       // dispatch(setModel(true));
        dispatch(setLoading(false))
    }
    }

  return (
    <tr className="border-dotted border-b ">
      <td className="flex items-center space-x-3 py-5">
        <Link to={`/preview/${title}`} state={{ product }}>
          <img
            className="w-[90px] h-[100px] border rounded py-3"
            src={thumbnail}
            alt=""
          />
        </Link>
        <div className="text-left">
          <h1 className="text-md font-bold">{title}</h1>
          <p className="text-sm">{description.substring(0, 40) + "..."}</p>
          <p className="text-xs pt-1">Category: {category}</p>
          <p className="text-xs">
            Brand: {typeof brand === 'undefined' ? 'No Brand' : brand}
          </p>
          <p className="text-xs text-green-500 font-semibold pt-1">{shippingInformation}</p>
        </div>
      </td>
      <td>
        <p className="line-through text-gray-400">${price.toFixed(2)}</p>
        <p className="text-lg font-semibold">
          ${(price - (price / 100) * discountPercentage).toFixed(2)}
        </p>
      </td>
      <td>
         <span className="flex items-center gap-2">
              <button className={`bg-[#f7f7f7]  p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-xs hover:bg-white duration-200 cursor-pointer ${product.quantity == 1? 'text-gray-300' : 'text-black'}`}>
                <IoRemoveOutline onClick={() => removeQuantity()}/>
              </button>
              <p>{product.quantity}</p>
              <button className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-xs hover:bg-white duration-200 cursor-pointer">
                <IoMdAdd onClick={() => addToCart(product)}/>
              </button>
          </span>
      </td>
      <td>
        ${((price - (price / 100) * discountPercentage) * quantity).toFixed(2)}
      </td>
      <td>
        <button
          className="hover:text-blue-400 active:text-red-500"
          onClick={() => {
            removeProduct();
          }}
        >
          <AiFillDelete size={"1.5rem"} />
        </button>
      </td>
    </tr>
  );
};

export default AddTocart;
