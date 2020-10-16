import React, { useEffect, useState } from "react";
import Aux from "../../../hoc/_Aux";
import {
  Col,
  Card,
  Table,
  Form,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import { Formik } from "formik";

import MyVerticallyCenteredModalGet from "../../components/MyVerticallyCenteredModal";
import { getApiCall, postApiCall } from "../../helpers/api-helper";
import { v4 as uuid } from "uuid";

import TableSkeletonCard from "../../components/TableSkeletonCard";
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
  const { setAccounts, id, account, ...props1 } = props;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    const { _id, ...values1 } = values;

    const body = {
      serverId: id,
      id: Object.keys(account).length !== 0 ? _id : uuid(),
      ...values1,
    };

    const path =
      Object.keys(account).length !== 0
        ? "serverDatabase/updateServerDatabase"
        : "serverDatabase/addServerDatabase";
    const json = await postApiCall(path, body);

    setAccounts((preState) => {
      console.log("pre state set account", preState);
      if (!json) {
        return preState;
      }
      if (preState) {
        if (Object.keys(account).length !== 0) {
          return preState.map((item) =>
            item._id === _id ? { ...item, ...values1 } : item
          );
        }
        return [...preState, body];
      }
      return [json];
    });
    setLoading(false);
    props.onHide();
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
                  {errors.name && (
                    <h6 className="py-1 text-red-500">{errors.name}</h6>
                  )}
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="ip">
                  <Form.Label>IP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="192.169.0.1"
                    isValid={touched.ip && !errors.ip}
                    onChange={handleChange}
                    value={values.ip}
                    isInvalid={!!errors.ip}
                  />
                  {errors.ip && (
                    <h6 className="py-1 text-red-500">{errors.ip}</h6>
                  )}
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="port">
                  <Form.Label>Port</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="22"
                    value={values.port}
                    onChange={handleChange}
                    isValid={touched.ip && !errors.port}
                    isInvalid={!!errors.port}
                  />
                  {errors.port && (
                    <h6 className="py-1 text-red-500">{errors.port}</h6>
                  )}
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="publicIp">
                  <Form.Label>publicIp</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="22"
                    value={values.publicIp}
                    onChange={handleChange}
                    // isValid={touched.ip && !errors.port}
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
                  {errors.type && (
                    <h6 className="py-1 text-red-500">{errors.type}</h6>
                  )}
                </Form.Group>
              </Form.Row>
              <Button variant="primary" disabled={loading} type="submit">
                {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
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

  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [deletConfirm, setDeletConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const path = "serverDatabase/viewServerDatabase";
    const json = await getApiCall(path);

    if (json) {
      setAccounts(json.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  const onDelete = async () => {
    const path = "serverDatabase/deleteServerDatabase";

    const body = { id: account._id };

    const json = await postApiCall(path, body);
    if (json) {
      setAccounts((preState) => {
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="primary"
          onClick={() => {
            setAccount({});
            setModalShow(true);
          }}
        >
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
              {loading && <TableSkeletonCard col={6} />}
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
