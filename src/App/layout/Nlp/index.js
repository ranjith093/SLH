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
        setAccounts={setCpass}
        nlp={nlp}
      />
      <MyVerticallyCenteredModalGet
        title="Are you sure want to Delete ?"
        show={deletConfirm}
        onHide={() => setDeletConfirm(false)}
        body={
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button>Yes</Button>
            <Button>No</Button>
          </div>
        }
      />
      <Card>
        <Card.Header>
          <Card.Title as="h5">NLP</Card.Title>
          {/* <span className="d-block m-t-5">
            use props <code>hover</code> with <code>Table</code> component
          </span> */}
        </Card.Header>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>IP</th>
                <th>Port</th>

                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cpass &&
                cpass.map((data, i) => (
                  <tr key={data.name}>
                    <th scope="row">{i + 1}</th>
                    <td>{data.name}</td>
                    <td>{data.ip}</td>
                    <td>{data.port}</td>
                    <td style={{}}>
                      <i
                        className="feather icon-edit
                       auth-icon "
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setnlp(data);
                          setModalShow(true);
                        }}
                      />
                      <i
                        className="feather icon-trash
                       auth-icon ml-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => setDeletConfirm(true)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Aux>
  );
};

export default Cpass;
