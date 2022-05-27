import React from "react";

const Button = (props) => {
  return (
    <>
      <button
        className={
          props.text === "release"
            ? "btn slotBtnS shadow-none"
            : "btn slotBtnB shadow-none"
        }
      >
        {props.text}
      </button>
    </>
  );
};

export default Button;
