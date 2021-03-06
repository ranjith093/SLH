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

import MyVerticallyCenteredModalGet from "../../components/MyVerticallyCenteredModal";

const validate = (values) => {
  // console.log("validate");
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 10) {
    console.log("length more");
    errors.name = "Must be 15 characters or less";
  }

  if (!values.detail) {
    errors.detail = "Required";
  } else if (values.detail.length > 10) {
    console.log("length more");
    errors.detail = "Must be 15 characters or less";
  }
  if (!values.rate) {
    errors.rate = "Required";
  } else if (values.rate.length > 10) {
    console.log("length more");
    errors.rate = "Must be 15 characters or less";
  }
  if (!values.gateway) {
    errors.gateway = "Required";
  } else if (values.gateway.length > 10) {
    console.log("length more");
    errors.gateway = "Must be 15 characters or less";
  }
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
        <Modal.Title id="contained-modal-title-vcenter">
          Add Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          {/* <Card.Header> */}

          {/* </Card.Header> */}

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
                      placeholder="Enter name"
                      onChange={handleChange}
                      // isValid={touched.name && !errors.name}
                      isInvalid={!!errors.name}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="detail">
                    <Form.Label>Detail</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Detail"
                      onChange={handleChange}
                      // isValid={touched.name && !errors.name}
                      isInvalid={!!errors.detail}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="rate">
                    <Form.Label>Rate</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Rate"
                      onChange={handleChange}
                      // isValid={touched.name && !errors.name}
                      isInvalid={!!errors.rate}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="gateway">
                    <Form.Label>Gateway</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Gateway"
                      onChange={handleChange}
                      // isValid={touched.name && !errors.name}
                      isInvalid={!!errors.gateway}
                    />
                  </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
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
  const [deletConfirm, setDeletConfirm] = useState(false);

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
          <Card.Title as="h5">Accounts</Card.Title>
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
                <th>Detail</th>
                <th>Rate</th>
                <th>Gateway</th>
                <th>Actions</th>
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
                    <td>{data.rate}</td>
                    <td>{data.gateway}</td>
                    {/* <td>{data.port}</td>
                    <td>{data.type}</td> */}
                    <td style={{}}>
                      <i
                        className="feather icon-edit
                       auth-icon "
                        style={{ cursor: "pointer" }}
                        onClick={() => setModalShow(true)}
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
}

export default Add;
