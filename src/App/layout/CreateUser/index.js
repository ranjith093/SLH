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
  Table,
} from "react-bootstrap";

import { Formik } from "formik";

import MyVerticallyCenteredModalGet from "../../components/MyVerticallyCenteredModal";

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
  const { setCpass, nlp, ...props1 } = props;
  const passto = (entry, values) => {
    console.log("values from modal pass to", values);
  };
  console.log("nlp", nlp);

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
        <Modal.Title id="contained-modal-title-vcenter">Add NLP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          // validationSchema={schema}
          onSubmit={onSubmit}
          initialValues={{
            name: nlp.name,
          }}
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
                    value={nlp.name ? nlp.name : ""}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                    isInvalid={!!errors.name}
                  />
                  {/* <Form.Text classN ame="text-muted">
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
  const [deletConfirm, setDeletConfirm] = useState(false);

  const [nlp, setnlp] = useState({});

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
          <Card>
            <Card.Header>
              <Card.Title as="h5">Basic User</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Form.Group as={Col} md="6" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text> */}
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" placeholder="Phone" />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="company">
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text" placeholder="Company" />
                  </Form.Group>
                  {/* <Form.Group controlId="formBasicChecbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group> */}
                </Row>
                <Button variant="primary">Submit</Button>
              </Form>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Options</Card.Title>
            </Card.Header>

            <Card.Body>
              <Form>
                <Row>
                  <Col md={12}>
                    {/* <h5>Options</h5>
                    <hr /> */}
                    <Form.Group>
                      <Form.Check
                        custom
                        type="checkbox"
                        id="dialer"
                        label="Dialer"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Check custom type="checkbox" id="vb" label="VB" />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary">Submit</Button>
              </Form>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title as="h5">Cpass</Card.Title>
            </Card.Header>

            <Card.Body>
              <Form>
                <Row>
                  <Col md={12}>
                    {/* <h5>Options</h5>
                    <hr /> */}
                    <Form.Group>
                      <Form.Check
                        inline
                        custom
                        type="radio"
                        label="cpass 1"
                        name="supportedRadio"
                        id="supportedRadio21"
                      />
                      <Form.Check
                        inline
                        custom
                        type="radio"
                        label="cpass 2"
                        name="supportedRadio"
                        id="supportedRadio22"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary">Submit</Button>
              </Form>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title as="h5">Dialer</Card.Title>
            </Card.Header>

            <Card.Body>
              <Form>
                <Row>
                  <Col md={12}>
                    {/* <h5>Licence</h5>
                    <hr /> */}
                    <Form.Group controlId="licence">
                      <Form.Label>Licence</Form.Label>
                      <Form.Control type="text" placeholder="licence" />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <h5>Database</h5>
                    <hr />
                    <Form.Group>
                      <Form.Check
                        inline
                        custom
                        type="radio"
                        label="mongo"
                        name="supportedRadio"
                        id="supportedRadio23"
                      />
                      <Form.Check
                        inline
                        custom
                        type="radio"
                        label="sql"
                        name="supportedRadio"
                        id="supportedRadio24"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <h5>Features</h5>
                    <hr />
                    <Form.Group>
                      <Form.Check
                        custom
                        type="checkbox"
                        id="dialer"
                        label="Dialer"
                      />
                      <Form.Check
                        custom
                        type="checkbox"
                        id="dialer"
                        label="Dialer"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary">Submit</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default Cpass;
