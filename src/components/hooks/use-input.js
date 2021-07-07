import { useReducer } from "react";

const initialReducerState = {
  inputValue: "",
  isInputTouched: false,
};

const reducerAction = (state, action) => {
  if (action.verb === "SETTOUCH") {
    return { inputValue: state.inputValue, isInputTouched: action.value };
  }
  if (action.verb === "SETVALUE") {
    return { inputValue: action.value, isInputTouched: state.isInputTouched };
  }
  return initialReducerState;
};

const UseInput = (validatingFunct) => {
  // const [inputValue, setInputValue] = useState("");
  // const [isInputTouched, setIsInputTouched] = useState(false);

  const [reducerState, dispatchAction] = useReducer(
    reducerAction,
    initialReducerState
  );

  const isInputValid = validatingFunct(reducerState.inputValue);

  const inputChangeHandler = (e) => {
    e.preventDefault();
    if (!reducerState.isInputTouched)
      dispatchAction({ verb: "SETTOUCH", value: true });
    //setIsInputTouched(true);

    dispatchAction({ verb: "SETVALUE", value: e.target.value });
    //setInputValue(e.target.value);
  };

  const onBlurHandler = () => {
    dispatchAction({ verb: "SETTOUCH", value: true });
    //setIsInputTouched(true);
  };

  const reset = () => {
    dispatchAction({ verb: "SETVALUE", value: "" });
    dispatchAction({ verb: "SETTOUCH", value: false });
    // setInputValue("");
    // setIsInputTouched(false);
  };

  const noErrorInput = !reducerState.isInputTouched || isInputValid;

  return {
    reset,
    inputValue: reducerState.inputValue,
    setInputValue: (value) => {
      dispatchAction({ verb: "SETVALUE", value });
    },
    isInputTouched: reducerState.inputValue,
    setIsInputTouched: (value) => {
      dispatchAction({ verb: "SETTOUCH", value });
    },
    isInputValid,
    inputChangeHandler,
    onBlurHandler,
    noErrorInput,
  };
};

export default UseInput;
