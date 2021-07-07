import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [showCart, setShowCart] = useState(false);

  const doShowCart = () => {
    setShowCart(true);
  };

  const hideCart = () => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      {showCart && <Cart onHideCart={hideCart} />}
      <Header onShowCart={doShowCart}></Header>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
