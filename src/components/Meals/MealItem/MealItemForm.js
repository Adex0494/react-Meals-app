import { useRef } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const inputRef = useRef();
  //const [amountIsValid, setAmountIsValid] = useState(true);
  const onAddAmount = (e) => {
    e.preventDefault();
    const amount = +inputRef.current.value;
    // if (!amount > 0) {
    //   setAmountIsValid(false);
    // }
    //setAmountIsValid(true);
    props.addAmount(amount);
  };
  return (
    <form className={classes.form} onSubmit={onAddAmount}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: `amount ${props.id}`,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
