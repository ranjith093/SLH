import React from "react";
import { Col, Form } from "react-bootstrap";

function MyFormGroup({ handleChange, errors, name }) {
  //   console.log("errors", errors);
  return (
    <Form.Group as={Col} md="6" controlId={`${name}`}>
      <Form.Label>{name}</Form.Label>

      <Form.Control
        type="text"
        placeholder={`Enter ${name}`}
        onChange={handleChange}
        isInvalid={errors[name]}
      />
    </Form.Group>
  );
}

export default MyFormGroup;
