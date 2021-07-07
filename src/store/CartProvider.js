import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    console.log(state.items);
    const itemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    let updatedItems = [];
    if (itemIndex >= 0) {
      updatedItems = [...state.items];
      updatedItems[itemIndex].amount += action.item.amount;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const index = state.items.findIndex((item) => item.id === action.id);
    state.totalAmount -= state.items[index].price;
    if (state.items[index].amount > 1) {
      state.items[index].amount--;
    } else {
      state.items.splice(index, 1);
    }
    return {
      items: [...state.items],
      totalAmount: state.totalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const resetCart = () => {
    dispatchCartAction({ type: "RESET" });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    resetCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
