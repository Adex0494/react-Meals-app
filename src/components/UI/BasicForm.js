import UseInput from "../hooks/use-input";
import CartContext from "../../store/cart-context";
import "./BasicForm.css";
import { useContext } from "react";

const BasicForm = (props) => {
  const hasTextValidation = (value) => value.trim() !== "";

  const nameInput = UseInput(hasTextValidation);
  const addressInput = UseInput(hasTextValidation);
  const emailInput = UseInput((value) => value.includes("@"));

  let formIsValid = false;

  const formCtx = useContext(CartContext);
  const submitOrder = async () => {
    const order = {
      name: nameInput.inputValue,
      email: emailInput.inputValue,
      items: formCtx.items,
    };
    try {
      const response = await fetch(
        "https://react-45d3a-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify(order),
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      if (!(response.status === 200 && response.ok === true))
        throw Error("An error occured when submitting the order");

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (
    nameInput.isInputValid &&
    addressInput.isInputValid &&
    emailInput.isInputValid
  )
    formIsValid = true;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) return;

    submitOrder();
    //props.onCloseModal(); //Closes the Modal that contains this form
    props.onHttpSuccess();
    formCtx.resetCart();

    console.log(
      nameInput.inputValue,
      addressInput.inputValue,
      emailInput.inputValue
    );
    // nameInput.reset();
    // addressInput.reset();
    // emailInput.reset();
  };

  const inputStyle = (noErrorInput) => {
    return "form-control" + (noErrorInput ? "" : " invalid");
  };

  const nameInputStyle = inputStyle(nameInput.noErrorInput);
  const addressInputStyle = inputStyle(addressInput.noErrorInput);
  const emailInputStyle = inputStyle(emailInput.noErrorInput);

  return (
    <form onSubmit={onSubmitHandler}>
      <div className={nameInputStyle}>
        <label htmlFor="name">First Name</label>
        <input
          onChange={nameInput.inputChangeHandler}
          onBlur={nameInput.onBlurHandler}
          value={nameInput.inputValue}
          type="text"
          id="name"
        />
        {!nameInput.noErrorInput && (
          <p className="error-text">Enter a valid name</p>
        )}
      </div>
      <div className={addressInputStyle}>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          onChange={addressInput.inputChangeHandler}
          onBlur={addressInput.onBlurHandler}
          value={addressInput.inputValue}
        />
        {!addressInput.noErrorInput && (
          <p className="error-text">Enter a valid address</p>
        )}
      </div>

      <div className={emailInputStyle}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="text"
          id="email"
          onChange={emailInput.inputChangeHandler}
          onBlur={emailInput.onBlurHandler}
          value={emailInput.inputValue}
        />
        {!emailInput.noErrorInput && (
          <p className="error-text">Enter a valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
