import React, { useEffect, useState } from "react";
import Aux from "../../../hoc/_Aux";
import {
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  Modal,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Formik } from "formik";

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
  }
  // else if (
  //   /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
  //     values.ip
  //   )
  // ) {
  //   errors.ip = "Invalid IP";
  // }
  else if (values.ip.length > 20) {
    errors.ip = "Must be 20 characters or less";
  }
  if (!values.port) {
    errors.port = "Required";
  } else if (values.port.length > 20) {
    errors.port = "Must be 20 characters or less";
  }
  if (!values.type) {
    errors.type = "Required";
  } else if (values.type.length > 20) {
    errors.type = "Must be 20 characters or less";
  } else if (values.type === "select") {
    errors.type = "plz select";
  }

  return errors;
};

function MyVerticallyCenteredModal(props) {
  console.log("props", { ...props });
  const { setAccounts, id, ...props1 } = props;
  const passto = (entry, values) => {
    console.log("values from modal pass to", values);
  };

  const onSubmit = (values) => {
    console.log("values ", { id, ...values });

    const path = "server/addDatabase";
    const url = `http://localhost:5000/${path}`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...values }),
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

        // setAccounts((preState) => [...preState, Object.assign(entry, values)]);
        setAccounts((preState) => {
          if (preState) {
            return [...preState, values];
          }
          return [values];
        });
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
        <Modal.Title id="contained-modal-title-vcenter">
          Add Databases
        </Modal.Title>
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
                    placeholder="IP"
                    onChange={handleChange}
                    isInvalid={!!errors.ip}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="port">
                  <Form.Label>Port</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Port"
                    onChange={handleChange}
                    isInvalid={!!errors.port}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="type">
                  <Form.Label>Type</Form.Label>
                  {/* <Form.Control
                    type="text"
                    placeholder="Type"
                    onChange={handleChange}
                  /> */}
                  <Form.Control
                    size="sm"
                    as="select"
                    defaultValue="select"
                    onChange={handleChange}
                    isInvalid={!!errors.type}
                  >
                    <option value="select"> Select</option>
                    <option value="mongodb">MongoDb</option>
                    <option value="mysql"> MYSQL</option>
                  </Form.Control>
                </Form.Group>
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

function Add(props) {
  const id = props.location.data.id;
  const name = props.location.data.name;
  const url = props.location.data.url;
  console.log(props.location.data);

  const [accounts, setAccounts] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    const path = `server/getDatabase?id=${id}`;
    const url = `http://localhost:5000/${path}`;

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log("data api server", json);
        // {status: "success", id: "5f803ae8a4f3cd169bfe0740"}
        if (json.status === "fail") {
          console.log(json.error);
          return;
        }
        setAccounts(json.data);
      });
  }, []);

  return (
    <Aux>
      {/* <div>{id}</div>
      <div>{url}</div>
      <div>{name}</div> */}

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
        id={id}
        setAccounts={setAccounts}
      />
      <Card>
        <Card.Header>
          <Card.Title as="h5">Databases</Card.Title>
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
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {accounts &&
                accounts.map((data, i) => (
                  <tr key={data.name}>
                    <th scope="row">{i + 1}</th>
                    <td>{data.name}</td>
                    <td>{data.ip}</td>
                    <td>{data.port}</td>
                    <td>{data.type}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Aux>
  );
}

export default Add;
