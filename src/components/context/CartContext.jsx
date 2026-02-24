import React, { createContext, useEffect, useState } from 'react'

export const CartContext = createContext();

export default function CartProvider(children) {

  //Favorites
    const [favorites, setFavorites] = useState(() => {
    const saveFav = localStorage.getItem("favoriteItems");
    return saveFav ? JSON.parse(saveFav) : [];
  }); 

  //Add To Fav
  const addToFavorite = (item) => {
    setFavorites((prev) => {
      if(prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    })
  }

  useEffect(()=> {
    localStorage.setItem("favoriteItems", JSON.stringify(favorites))
  }, [favorites])

  //removeFromCart
  const removeFromFav = (id) => {
    setFavorites(prevItem => prevItem.filter(item => item.id !== id))
  }



  //Carts
  const [cartItems, setCartItems] = useState(() => {
    const saveCart = localStorage.getItem("cartItems");
    return saveCart ? JSON.parse(saveCart) : [];
  });


  //icreaseQuantity
  const icreaseQuantity = (id) => {
    setCartItems(prevItem => prevItem.map(item => 
      item.id === id ? {...item, quantity: item.quantity + 1} : item
    ))
  }
  //decreaseQuantity
  const decreaseQuantity = (id) => {
    setCartItems(prevItem => prevItem.map(item => 
      item.id === id && item.quantity > 1 ? {...item, quantity: item.quantity - 1} : item
    ))
  }

  //removeFromCart
  const removeFromCart = (id) => {
    setCartItems(prevItem => prevItem.filter(item => item.id !== id))
  }


  const addToCart = (item) => {
    setCartItems((prevItem) => [...prevItem, {...item, quantity: 1}]);//لو ف منتجات قبل كده هتزود عليها المنتج ده 
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])






  return (
    <CartContext.Provider value={{cartItems, addToCart, icreaseQuantity, decreaseQuantity,removeFromCart, addToFavorite, favorites, removeFromFav}}>
      {children.children}
    </CartContext.Provider>
  )
}

