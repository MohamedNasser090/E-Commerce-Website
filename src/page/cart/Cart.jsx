import React, { useContext } from "react";
import { CartContext } from "../../components/context/CartContext";
import { RiDeleteBinLine } from "react-icons/ri";
import "../cart/cart.css";
import PageTransition from "../../components/PageTransition";

function Cart() {
  const { cartItems, icreaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);
  console.log("cartItems: ", cartItems); //Products Add in Cart
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <PageTransition>
      <div className="checkout">
        <div className="ordersummary">
          <h1>Order Summary</h1>

          <div className="items">
            {cartItems.length === 0 ? (
              <p>Cart Is Impty</p>
            ) : (
              cartItems.map((item, indx) => (
                <div key={indx} className="item-cart">
                  <div className="image-name">
                    <div className="img-item">
                      <img src={item.images[0]} alt="" />
                    </div>
                    <div className="content">
                      <h4>{item.title}</h4>
                      <p className="price-item">$ {item.price}</p>
                      <div className="quantity-control">
                        <button onClick={() => icreaseQuantity(item.id)}>
                          +
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button onClick={() => decreaseQuantity(item.id)}>
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="delete-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <RiDeleteBinLine />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="bottom-summary">
            <div className="shop_table">
              <p>Total:</p>
              <span className="total_checkout">$ {total.toFixed(2)}</span>
            </div>

            <div className="button-div">
              <button className="submit">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Cart;
