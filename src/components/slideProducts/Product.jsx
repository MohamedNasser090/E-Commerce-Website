import { useContext } from "react";
import {
  FaStar,
  FaStarHalfStroke,
  FaShare,
  FaRegHeart,
  FaCartArrowDown,
  FaCheck,
} from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../../index.css";
import toast from "react-hot-toast";
function Product({ item }) {
  const { cartItems, addToCart, favorites, addToFavorite, removeFromFav } =
    useContext(CartContext);
  const isInCart = cartItems.some((i) => i.id === item.id); //true or false
  const navigate = useNavigate();
  //AddToCart When Click
  const handeleAddToCart = () => {
    addToCart(item);
    toast.success(
      <div className="toast-wrapper">
        <img src={item.images[0]} alt="" className="toast-img" />
        <div className="toast-content">
          <strong>{item.title}</strong>
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
  const isInFav = favorites.some((i) => i.id === item.id); //true or false
  console.log(isInFav);
  const handleToFavorites = () => {
    if (isInFav) {
      removeFromFav(item.id);
      toast.error(`${item.title} Removed From Favorite`);
    } else {
      addToFavorite(item);
      toast.success(`${item.title} Add To Favorite`);
    }
  };

  return (
    <div className={`product ${isInCart ? "in-cart" : ""}`}>
      <Link to={`/products/${item.id}`}>
        <span className="status-cart">
          <FaCheck /> in Cart
        </span>
        <div className="img_product">
          <img src={item.images[0]} alt="" />
        </div>
        <p className="name_product">{item.title}</p>
        <div className="stars">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfStroke />
        </div>
        <p className="price">
          <span> {item.price}$ </span>
        </p>
      </Link>
      <div className="icons">
        <span className="btn-addToCart" onClick={handeleAddToCart}>
          <FaCartArrowDown />
        </span>
        <span
          className={`${isInFav ? "infav" : ""}`}
          onClick={handleToFavorites}
        >
          <FaRegHeart />
        </span>
        <span>
          
          <FaShare />
        </span>
      </div>
    </div>
  );
}

export default Product;
