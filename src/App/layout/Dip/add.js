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
  Accordion,
} from "react-bootstrap";
import { Formik } from "formik";

const validate = (values) => {
  // console.log("validate");
  const errors = {};
  if (!values.number) {
    // console.log("name error");
    errors.number = "Required";
  } else if (!/^[0-9]*$/i.test(values.number)) {
    errors.number = "Invalid  URL";
  } else if (values.number.length > 10) {
    console.log("length more");
    errors.number = "Must be 15 characters or less";
  }
  if (!values.status) {
    // console.log("name error");
    errors.status = "Required";
  } else if (values.status.length > 10) {
    console.log("length more");
    errors.status = "Must be 15 characters or less";
  } else if (values.status === "select") {
    errors.status = "plz select";
  }

  // console.log("error", errors);

  return errors;
};
const validateRange = (values) => {
  // console.log("validate");
  const errors = {};
  if (!values.number) {
    // console.log("name error");
    errors.number = "Required";
  } else if (!/^[0-9]*$/i.test(values.number)) {
    errors.number = "Invalid  URL";
  } else if (values.number.length > 10) {
    console.log("length more");
    errors.number = "Must be 15 characters or less";
  }
  if (!values.numberTo) {
    // console.log("name error");
    errors.numberTo = "Required";
  } else if (!/^[0-9]*$/i.test(values.numberTo)) {
    errors.numberTo = "Invalid  URL";
  } else if (values.numberTo.length > 10) {
    console.log("length more");
    errors.numberTo = "Must be 15 characters or less";
  }
  if (!values.status) {
    // console.log("name error");
    errors.status = "Required";
  } else if (values.status.length > 10) {
    console.log("length more");
    errors.status = "Must be 15 characters or less";
  } else if (values.status === "select") {
    errors.status = "plz select";
  }

  // console.log("error", errors);

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

    const path = "dip/addNumber";
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
  const onSubmitRange = (values) => {
    console.log("values ", { id, ...values });

    const path = "dip/addNumber";
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
        <Modal.Title id="contained-modal-title-vcenter">Add Number</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Accordion defaultActiveKey="0">
          <Card>
            {/* <Card.Header> */}
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Single Entry
            </Accordion.Toggle>
            {/* </Card.Header> */}
            <Accordion.Collapse eventKey="0">
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
                      <Form.Group as={Col} md="6" controlId="number">
                        <Form.Label>Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Number"
                          onChange={handleChange}
                          isValid={touched.name && !errors.name}
                          isInvalid={!!errors.number}
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="6" controlId="status">
                        <Form.Label>Status</Form.Label>

                        <Form.Control
                          size="sm"
                          as="select"
                          defaultValue="select"
                          onChange={handleChange}
                          isInvalid={!!errors.status}
                        >
                          <option value="select"> Select</option>
                          <option value="unused">Unused</option>
                          <option value="used"> Used</option>
                        </Form.Control>
                      </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Range Entry
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="1">
              <Formik
                // validationSchema={schema}
                onSubmit={onSubmitRange}
                initialValues={{}}
                validate={validateRange}
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
                      <Form.Group as={Col} md="6" controlId="number">
                        <Form.Label>Number From</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Number"
                          onChange={handleChange}
                          isValid={touched.name && !errors.name}
                          isInvalid={!!errors.number}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="numberTo">
                        <Form.Label>Number To</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Number"
                          onChange={handleChange}
                          isValid={touched.name && !errors.name}
                          isInvalid={!!errors.numberTo}
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="6" controlId="status">
                        <Form.Label>Status</Form.Label>

                        <Form.Control
                          size="sm"
                          as="select"
                          defaultValue="select"
                          onChange={handleChange}
                          isInvalid={!!errors.status}
                        >
                          <option value="select"> Select</option>
                          <option value="unused">Unused</option>
                          <option value="used"> Used</option>
                        </Form.Control>
                      </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </Accordion.Collapse>
          </Card>
        </Accordion>
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
    const path = `dip/getNumber?id=${id}`;
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
          <Card.Title as="h5">Numbers</Card.Title>
          {/* <span className="d-block m-t-5">
            use props <code>hover</code> with <code>Table</code> component
          </span> */}
        </Card.Header>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Number</th>
                <th>Status</th>
                {/* <th>Port</th>
                <th>Type</th> */}
              </tr>
            </thead>
            <tbody>
              {accounts &&
                accounts.map((data, i) => (
                  <tr key={data.name}>
                    <th scope="row">{i + 1}</th>
                    <td>{data.number}</td>
                    <td>{data.status}</td>
                    {/* <td>{data.port}</td>
                    <td>{data.type}</td> */}
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
