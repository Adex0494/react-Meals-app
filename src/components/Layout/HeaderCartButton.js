import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [bump, setBump] = useState(false);

  const numberOfCartItems = cartCtx.items.reduce(
    (curNumber, item) => curNumber + item.amount,
    0
  );

  const buttonClass = `${classes.button} ${bump ? classes.bump : ""}`;
  const { items } = cartCtx;

  useEffect(() => {
    if (items.length === 0) return;
    setBump(true);

    const timer = setTimeout(() => {
      setBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={buttonClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
