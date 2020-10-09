import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

import { Formik } from "formik";

import Aux from "../../../hoc/_Aux";

import { requestQuery } from "../../helpers/apirequest";

const validate = (values) => {
  // console.log("validate");
  const errors = {};
  if (!values.name) {
    // console.log("name error");
    errors.name = "Required";
  } else if (values.name.length > 15) {
    console.log("length more");
    errors.name = "Must be 15 characters or less";
  }

  if (!values.url) {
    errors.url = "Required";
  } else if (values.url.length > 20) {
    errors.url = "Must be 20 characters or less";
  }

  return errors;
};

const Cpass = () => {
  const [cpass, setCpass] = useState([]);

  useEffect(() => {
    const path = "cpass";
    const url = `http://localhost:5000/${path}`;

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log("data api", json);
        // {status: "success", id: "5f803ae8a4f3cd169bfe0740"}
        if (json.status === "fail") {
          console.log(json.error);
          return;
        }
        setCpass(json);
      });
  }, []);

  const onSubmit = (values) => {
    console.log("values ", values);

    const path = "cpass/add";
    const url = `http://localhost:5000/${path}`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log("data api", json);
        // {status: "success", id: "5f803ae8a4f3cd169bfe0740"}
        if (json.status === "fail") {
          console.log(json.error);
          return;
        }
        const entry = {
          id: json.id,
        };
        setCpass((preState) => [...preState, Object.assign(entry, values)]);
      });
  };
  return (
    <Aux>
      <Row>
        <Col>
          <Card>
            <Card.Header
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Card.Title as="h5">Cpass</Card.Title>
              <Button variant="primary">Add</Button>
            </Card.Header>
            <Card.Body>
              <Row>
                {/* EXPECTED Cpass  
              cpass=   [
                  {
                      "id": "5f804458e318062dd0d888ba",
                      "name": "name",
                      "url": "url",
                      "token": "token ",
                      "key": "key"
                  },
                  {
                      "id": "5f804603e318062dd0d888bb",
                      "name": "vedantu",
                      "url": "vedantu.slashrtc.in",
                      "token": "vedantuGateway",
                      "key": "507130"
                  }
              ] */}

                {cpass &&
                  cpass.map((data) => (
                    <Col key={data.id} md={6} xl={4} className="">
                      <>
                        <Card.Body
                          className="shadow-1"
                          style={{ marginTop: "20px" }}
                        >
                          <h6 className="mb-4">{data.url}</h6>
                          <div className="row d-flex align-items-center mb-2">
                            <div className="col-9">
                              <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{" "}
                                {data.name}
                              </h3>
                            </div>

                            <div className="col-3 text-right">
                              <p className="m-b-0">{data.key}</p>
                            </div>
                          </div>
                          <Row>
                            <Col>
                              {/* <h6>URL</h6> */}
                              {/* <h5 className="mb-4">{data.url}</h5> */}
                            </Col>
                            {/* <Col>
                              <h6>Token</h6>
                              <h5 className="">{data.token}</h5>
                            </Col> */}
                          </Row>

                          {/* <h6 className="mb-4 ml-3">{data.key}</h6> */}
                          <div
                            className="progress m-t-20"
                            style={{ height: "7px" }}
                          >
                            <div
                              className="progress-bar progress-c-theme"
                              role="progressbar"
                              style={{ width: "50%" }}
                              aria-valuenow="50"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            />
                          </div>
                        </Card.Body>
                      </>
                    </Col>
                  ))}
              </Row>
              {/* <hr /> */}
              <h5 className="mt-5">Form controls</h5>
              <hr />
              <Formik
                // validationSchema={schema}
                onSubmit={onSubmit}
                initialValues={{}}
                validate={validate}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  errors,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Row>
                      <Form.Group as={Col} md="6" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          onChange={handleChange}
                          isValid={touched.name && !errors.name}
                          isInvalid={!!errors.name}
                        />
                        {/* <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                        </Form.Text> */}
                      </Form.Group>

                      <Form.Group as={Col} md="6" controlId="url">
                        <Form.Label>URL</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Url"
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="token">
                        <Form.Label>Token</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Token"
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="key">
                        <Form.Label>Key</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Key"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="checkBox">
                      <Form.Check
                        type="checkbox"
                        label="Check me out"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
              {/* <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Example select</Form.Label>
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group> */}
              {/* <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Example textarea</Form.Label>
                      <Form.Control as="textarea" rows="3" />
                    </Form.Group> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default Cpass;
