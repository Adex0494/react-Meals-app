import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import { Fragment, useState } from "react";
import BasicForm from "../UI/BasicForm";

const Modal = (props) => {
  const [isHttpSuccess, setIsHttpSuccess] = useState(false);

  const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClick} />;
  };

  const onHttpSuccess = () => {
    setIsHttpSuccess(true);
  };

  const ModalOverlay = (props) => {
    return (
      <div className={classes.modal}>
        {!isHttpSuccess && !props.showForm && (
          <div className={classes.content}>{props.children}</div>
        )}

        {!isHttpSuccess && props.showForm && (
          <BasicForm
            onHttpSuccess={onHttpSuccess}
            onCloseModal={props.onCloseModal}
          ></BasicForm>
        )}
        {isHttpSuccess && (
          <p className={classes.success}>Order sent successfully</p>
        )}
      </div>
    );
  };
  const protalElement = document.getElementById("overlays");

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onBackdropClick} />,
        protalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onCloseModal={props.onBackdropClick}
          showForm={props.showForm}
        >
          {props.children}
        </ModalOverlay>,
        protalElement
      )}
    </Fragment>
  );
};

export default Modal;
