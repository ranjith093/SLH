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
  Modal,
} from "react-bootstrap";

import { Formik } from "formik";

import Aux from "../../../hoc/_Aux";

import { requestQuery } from "../../helpers/apirequest";
import { Link } from "react-router-dom";

const validate = (values) => {
  // console.log("validate");
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 characters or less";
  }

  if (!values.ip) {
    errors.ip = "Required";
  } else if (
    !/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      values.ip
    )
  ) {
    errors.ip = "Invalid  IP ";
  } else if (values.ip.length > 20) {
    errors.ip = "Must be 20 characters or less";
  }
  if (!values.port) {
    errors.port = "Required";
  } else if (!/^([0-9]{1,5})$/.test(values.port)) {
    errors.port = "Invalid  port ";
  } else if (values.port.length > 20) {
    errors.port = "Must be 20 characters or less";
  }

  return errors;
};

function MyVerticallyCenteredModal(props) {
  console.log("props", { ...props });
  const { setCpass, ...props1 } = props;
  const passto = (entry, values) => {
    console.log("values from modal pass to", values);
  };

  const onSubmit = (values) => {
    // console.log("values ", values);

    const path = "server/add";
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

        // setCpass(entry);

        setCpass((preState) => [...preState, Object.assign(entry, values)]);
        props.onHide();

        // props.setCpass((preState) => [
        //   ...preState,
        //   Object.assign(entry, values),
        // ]);
      });
  };
  return (
    <Modal
      {...props1}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Server</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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

                <Form.Group as={Col} md="6" controlId="ip">
                  <Form.Label>IP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="192.168.0.1"
                    onChange={handleChange}
                    isInvalid={!!errors.ip}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="port">
                  <Form.Label>Port</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="22"
                    onChange={handleChange}
                    isInvalid={!!errors.port}
                  />
                </Form.Group>
                {/* <Form.Group as={Col} md="6" controlId="key">
                  <Form.Label>Key</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Key"
                    onChange={handleChange}
                  />
                </Form.Group> */}
              </Form.Row>
              {/* <Form.Group controlId="checkBox">
                <Form.Check
                  type="checkbox"
                  label="Check me out"
                  onChange={handleChange}
                />
              </Form.Group> */}
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

const Cpass = () => {
  const [cpass, setCpass] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    const path = "server";
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

  return (
    <Aux>
      <Row>
        <Col>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Add
            </Button>
          </div>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            setCpass={setCpass}
          />

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
                <Col key={data.id} md={6} xl={4} className="mb-4">
                  <>
                    <Link to={{ pathname: `/server/${data.id}`, data: data }}>
                      <Card.Body
                        className="shadow-1"
                        style={{ marginTop: "20px", background: "white" }}
                      >
                        <div className="row d-flex align-items-center mb-2">
                          <div className="col-9">
                            <h3 className="f-w-300 d-flex align-items-center m-b-0">
                              <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{" "}
                              {data.name}
                            </h3>
                          </div>

                          {/* <div className="col-3 text-right">
                            <p className="m-b-0">{data.key}</p>
                          </div> */}
                        </div>
                        <Row>
                          <h6 className="ml-4">{data.ip}</h6>
                          <h6 className="ml-1">:</h6>
                          <h6 className="ml-1">{data.port}</h6>
                        </Row>

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
                    </Link>
                  </>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Aux>
  );
};

export default Cpass;
