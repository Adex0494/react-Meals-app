import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import { useContext, useState } from "react";
import CartItem from "./CartItem";

const Cart = (props) => {
  const [showForm, setShowForm] = useState(false);

  const toggleShowForm = () => {
    setShowForm((prevState) => {
      return !prevState;
    });
  };

  const cartCtx = useContext(CartContext);

  const onAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const onRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={onAddHandler.bind(null, { ...item, amount: 1 })}
          onRemove={onRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onBackdropClick={props.onHideCart} showForm={showForm}>
      {cartItems}
      <div className={classes.total}>
        <span> Total Amount</span>
        <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {cartCtx.totalAmount > 0 && (
          <button className={classes.button} onClick={toggleShowForm}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
