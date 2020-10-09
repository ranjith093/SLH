import React from "react";
import Aux from "../../../hoc/_Aux";

function add(props) {
  const id = props.location.data.id;
  const name = props.location.data.name;
  const url = props.location.data.url;
  console.log(props.location.data);
  return (
    <Aux>
      <div>{id}</div>
      <div>{name}</div>
      <div>{url}</div>
    </Aux>
  );
}

export default add;
