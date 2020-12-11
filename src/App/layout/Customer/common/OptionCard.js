import React from "react";

const OptionCard = (props) => (
  <div
    className={` ${
      props.name === props.value ? "bg-blue-500 " : "bg-gray-100 "
    }  w-32 h-20 justify-between flex  flex-col  shadow-md rounded-lg p-2 m-2 `}
  >
    {props.children}
  </div>
);

export default OptionCard;
