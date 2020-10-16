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

import MyVerticallyCenteredModalGet from "../../components/MyVerticallyCenteredModal";
import { getApiCall, postApiCall } from "../../helpers/api-helper";
import { v4 as uuid } from "uuid";
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
  } else if (!/^([0-9]{1,5})$/.test(values.port)) {
    errors.port = "Invalid  port ";
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
  const { setAccounts, id, account, ...props1 } = props;
  // const passto = (entry, values) => {
  //   console.log("values from modal pass to", values);
  // };
  console.log("account edit", account);
  const onSubmit = async (values) => {
    console.log("values ", { id, ...values });
    const { _id, ...values1 } = values;

    // const path = "serverDatabase/addServerDatabase";
    const body = {
      serverId: id,
      id: Object.keys(account).length !== 0 ? _id : uuid(),
      ...values1,
    };

    // const path = "cpaasAcocunts/addCpaasAccount";
    const path =
      Object.keys(account).length !== 0
        ? "serverDatabase/updateServerDatabase"
        : "serverDatabase/addServerDatabase";
    const json = await postApiCall(path, body);
    console.log("json add account ", json);
    // const entry = {
    //   id: json.id,
    // };
    setAccounts((preState) => {
      console.log("pre state set account", preState);
      if (!json) {
        return preState;
      }
      if (preState) {
        return preState.map((item) =>
          item._id === _id ? { ...item, ...values1 } : item
        );
        // return [...preState, body];
      }
      return [json];
    });
    props.onHide();

    // const url = `http://localhost:5000/${path}`;

    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ id, ...values }),
    // };
    // return fetch(url, requestOptions)
    //   .then((response) => response.json())
    //   .then((json) => {
    //     console.log("data api", json);
    //     // {status: "success", id: "5f803ae8a4f3cd169bfe0740"}
    //     if (json.status === "fail") {
    //       console.log(json.error);
    //       return;
    //     }
    //     const entry = {
    //       id: json.id,
    //     };

    //     // setCpass(entry);

    //     // setAccounts((preState) => [...preState, Object.assign(entry, values)]);
    //     setAccounts((preState) => {
    //       if (preState) {
    //         return [...preState, values];
    //       }
    //       return [values];
    //     });
    //     props.onHide();

    //     // props.setCpass((preState) => [
    //     //   ...preState,
    //     //   Object.assign(entry, values),
    //     // ]);
    //   });
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
          initialValues={account}
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
                    placeholder="slashrtc"
                    onChange={handleChange}
                    value={values.name}
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
                    placeholder="192.169.0.1"
                    onChange={handleChange}
                    value={values.ip}
                    isInvalid={!!errors.ip}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="port">
                  <Form.Label>Port</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="22"
                    value={values.port}
                    onChange={handleChange}
                    isInvalid={!!errors.port}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="publicIp">
                  <Form.Label>publicIp</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="22"
                    value={values.publicIp}
                    onChange={handleChange}
                    // isInvalid={!!errors.publicIp}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="publicPort">
                  <Form.Label>publicPort</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="22"
                    value={values.publicPort}
                    onChange={handleChange}
                    // isInvalid={!!errors.publicPort}
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
                    value={values.type}
                    onChange={handleChange}
                    isInvalid={!!errors.type}
                  >
                    <option value="select"> Select</option>
                    <option value="mongodb">MongoDb</option>
                    <option value="mysql"> MYSQL</option>
                    <option value="mysql"> Elastic</option>
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
  const id = props.location.data._id;
  const name = props.location.data.name;
  const url = props.location.data.url;

  console.log(props.location.data);

  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [deletConfirm, setDeletConfirm] = useState(false);

  const getData = async () => {
    const path = "serverDatabase/viewServerDatabase";
    const json = await getApiCall(path);
    console.log("json helper", json);
    setAccounts(json.data);
  };
  useEffect(() => {
    getData();
    // const path = `server/getDatabase?id=${id}`;
    // const url = `http://localhost:5000/${path}`;

    // const requestOptions = {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    // };
    // fetch(url, requestOptions)
    //   .then((response) => response.json())
    //   .then((json) => {
    //     console.log("data api server", json);
    //     // {status: "success", id: "5f803ae8a4f3cd169bfe0740"}
    //     if (json.status === "fail") {
    //       console.log(json.error);
    //       return;
    //     }
    //     setAccounts(json.data);
    //   });
  }, []);

  const onDelete = async () => {
    const path = "serverDatabase/deleteServerDatabase";

    const body = { id: account._id };

    const json = await postApiCall(path, body);
    if (json) {
      setAccounts((preState) => {
        console.log("pre state set account", preState);

        if (preState) {
          setDeletConfirm(false);
          return preState.filter((item) => item._id !== account._id);
          // return [...preState, body];
        }
        return [];
      });
    }
  };

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
        account={account}
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
            <Button onClick={onDelete}>Yes</Button>
            <Button onClick={() => setDeletConfirm(false)}>No</Button>
          </div>
        }
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
                <th>Actions</th>
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
                    <td style={{}}>
                      <i
                        className="feather icon-edit
                       auth-icon "
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setAccount(data);
                          setModalShow(true);
                        }}
                      />
                      <i
                        className="feather icon-trash
                       auth-icon ml-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setAccount(data);
                          setDeletConfirm(true);
                        }}
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
