import React, { useContext } from "react";
import PageTransition from "../../components/PageTransition";
import Product from "../../components/slideProducts/Product";
import { CartContext } from "../../components/context/CartContext";

function Favorites() {
  const { favorites } = useContext(CartContext);
  return (
    <PageTransition>
      <div className="category-products favorite-page">
        <div className="container">
          <div className="top_slide">
            <h2>Your Favorites</h2>
          </div>

          {favorites.length === 0 ? (
            <p>No Favorite</p>
          ) : (
            <div className="products">
              {favorites.map((item, indx) => (
                <Product item={item} key={indx} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default Favorites;
