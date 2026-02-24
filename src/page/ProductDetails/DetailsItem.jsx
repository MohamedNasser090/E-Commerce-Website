import React, { useContext } from "react";
import {
  FaCartArrowDown,
  FaRegHeart,
  FaShare,
  FaStar,
  FaStarHalfStroke,
} from "react-icons/fa6";
import { CartContext } from "../../components/context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function DetailsItem({ product }) {
  const { cartItems, addToCart, favorites,addToFavorite,removeFromFav } = useContext(CartContext);

  const isInCart = cartItems.some(i => i.id === product.id);//true or false


  const navigate = useNavigate();

  const handeleAddToCart = () => {
    addToCart(product);
    toast.success(
      <div className="toast-wrapper">
        <img src={product.images[0]} alt="" className="toast-img" />
        <div className="toast-content">
          <strong>{product.title}</strong>
          add To Cart
          <button className="btn" onClick={() => navigate("/cart")}>
            View Cart
          </button>
        </div>
      </div>,
      { duration: 3500 },
    );
  };

    //Add To Favorite
  const isInFav = favorites.some((i) => i.id === product.id); //true or false
  console.log(isInFav);
  const handleToFavorites = () => {
    if (isInFav) {
      removeFromFav(product.id);
      toast.error(`${product.title} Removed From Favorite`);
    } else {
      addToFavorite(product);
      toast.success(`${product.title} Add To Favorite`);
    }
  };


  return (
    <div className="details-item">
      <h1 className="name">{product.title}</h1>
      <div className="stars">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalfStroke />
      </div>
      <p className="price">$ {product.price}</p>
      <h5>
        Availability: <span>{product.availabilityStatus}</span>
      </h5>
      <h5>
        Brand: <span>{product.brand}</span>
      </h5>
      <p className="description">{product.description}</p>
      <span className="stock">
        Hurry Up! Only {product.stock} products left in stock.
      </span>
      <button className={`btn ${isInCart ? 'in-cart' : ''}`} onClick={handeleAddToCart}>
        {isInCart ? "Item In Cart" : "Add To Cart"} <FaCartArrowDown />
      </button>
      <div className="icons">
        <span className={`${isInFav ? "infav" : ""}`} onClick={handleToFavorites}>
          <FaRegHeart />
        </span>
        <span>
          <FaShare />
        </span>
      </div>
    </div>
  );
}

export default DetailsItem;
