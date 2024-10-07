import React, { useContext } from "react";

import Tops from "../assets/images/catagory_image/tops.png";
import Mens_shirts from "../assets/images/catagory_image/mens-shirts.webp";
import Mens_shoes from "../assets/images/catagory_image/mens-shoes.avif";
import Mens_watches from "../assets/images/catagory_image/mens-watches.webp";
import Womens_bags from "../assets/images/catagory_image/womens-bags.png";
import Womens_dresses from "../assets/images/catagory_image/womens-dresses.png";
import Womens_shoes from "../assets/images/catagory_image/womens-shoes.webp";
import Womens_watches from "../assets/images/catagory_image/womens-watches.png";
import Sunglasses from "../assets/images/catagory_image/sunglasses.png";
import Fragrances from "../assets/images/catagory_image/perfume.ico";
import Laptops from "../assets/images/catagory_image/pngegg.png";
import Tablets from "../assets/images/catagory_image/tablets.png";
import Electronics from "../assets/images/catagory_image/electronics.png";
import Furniture from "../assets/images/catagory_image/furniture.png";
import Home_decoration from "../assets/images/catagory_image/home-decoration.png";
import Kitchen_accessories from "../assets/images/catagory_image/kitchen-accessories.png";
import Mobile_accessories from "../assets/images/catagory_image/electronic_accessories.png";
import Beauty from "../assets/images/catagory_image/cosmetic.png";
import Groceries from "../assets/images/catagory_image/grocery.png";
import Tools from "../assets/images/catagory_image/tools.png";
import sports_accessories from "../assets/images/catagory_image/Sport_balls.svg";
import Motorcycle from "../assets/images/catagory_image/motorcycle.webp";
import Vehicle from "../assets/images/catagory_image/vehicle.png";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";

const category_image = {
  Beauty,
  Fragrances,
  Womens_dresses,
  Womens_watches,
  Womens_bags,
  Womens_shoes,
  Tops,
  Mens_shirts,
  Mens_shoes,
  Mens_watches,
  Sunglasses,
  Home_decoration,
  Kitchen_accessories,
  Smartphones: "https://shorturl.at/oIyjJ",
  Tablets,
  Laptops,
  Electronics,
  Furniture,
  Mobile_accessories,
  Groceries,
  Tools,
  sports_accessories,
  Motorcycle,
  Vehicle
};

const CategoryBar = () => {
  const { dispatch } = useContext(ProductsContext);
  const navigate = useNavigate();

  const handleCategory = (key) => {
    dispatch({ type: "SET_LOADING", payload: true });
      navigate(`/products/category/${key.toLowerCase().replace("_", "-")}`);
  };

  return (
    <div className="catagory w-[95%] m-auto mt-4 bg-white flex  space-x-3 px-2 py-2 top-[56px] scrollbar-custom  overflow-auto ">
      {Object.keys(category_image).map((key) => (
        <div
          onClick={() => handleCategory(key)}
          key={key}
          className=" text-black font-bold px-5 py-2 drop-shadow-xl flex justify-center items-center gap-2 flex-col cursor-pointer"
        >
          <div className="bg-gray-100 p-2 md:w-16 md:h-16 w-12 h-12 rounded-full">
            <img className="w-full h-full" src={category_image[key]} alt="" />
          </div>
          <p className="text-center">{key}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;
