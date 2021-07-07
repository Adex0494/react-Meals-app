import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import { useContext } from "react";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${(+props.price).toFixed(2)}`;

  const addAmount = (amount) => {
    const item = {
      id: props.id,
      amount,
      price: props.price,
      name: props.title,
    };
    cartCtx.addItem(item);
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.title}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm addAmount={addAmount} id={props.id}></MealItemForm>
      </div>
    </li>
  );
};

export default MealItem;
