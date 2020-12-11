import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, Modal, Spinner } from "react-bootstrap";

import { Formik } from "formik";

import Aux from "../../../hoc/_Aux";

import { Link } from "react-router-dom";
import { getApiCall, postApiCall } from "../../helpers/api-helper";
import MyVerticallyCenteredModalGet from "../../components/MyVerticallyCenteredModal";
import { v4 as uuid } from "uuid";

import SkeletonCard from "../../components/SkeletonCard";

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
  const { setCpass, account, ...props1 } = props;

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    const path =
      Object.keys(account).length !== 0
        ? "server/updateServer"
        : "server/addServer";

    const { _id, ...values1 } = values;
    const body = {
      id: Object.keys(account).length !== 0 ? _id : uuid(),
      ...values1,
    };
    const json = await postApiCall(path, body);

    setCpass((preState) => {
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
        <Modal.Title id="contained-modal-title-vcenter">Add Server</Modal.Title>
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
                    placeholder="Enter Name"
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
                    value={values.ip}
                    placeholder="192.168.0.1"
                    onChange={handleChange}
                    isValid={touched.ip && !errors.ip}
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
                    isValid={touched.port && !errors.port}
                    isInvalid={!!errors.port}
                  />
                  {errors.port && (
                    <h6 className="py-1 text-red-500">{errors.port}</h6>
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

const Cpass = () => {
  const [cpass, setCpass] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [account, setAccount] = useState({});
  const [deletConfirm, setDeletConfirm] = useState(false);
  const [loading, setloading] = useState(false);

  const getData = async () => {
    const path = "server/viewServer";
    const json = await getApiCall(path);
    console.log("json helper", json);
    setCpass(json.data);
    setloading(false);
  };
  useEffect(() => {
    setloading(true);
    getData();
  }, []);

  const onDelete = async () => {
    const path = "server/deleteServer";

    const body = { id: account._id };

    const json = await postApiCall(path, body);
    if (json) {
      setCpass((preState) => {
        console.log("pre state set account", preState);

        if (preState) {
          return preState.filter((item) => item._id !== account._id);
          // return [...preState, body];
        }
        return [];
      });
    }
    setDeletConfirm(false);
  };

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
            setCpass={setCpass}
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

          <Row>
            {loading && <SkeletonCard />}
            {cpass &&
              cpass.map((data) => (
                <Col key={data.id} md={6} xl={4} className="mb-4">
                  <>
                    <Card.Body
                      className="shadow-1"
                      style={{ marginTop: "20px", background: "white" }}
                    >
                      <div className=" flex justify-end">
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
                      </div>
                      <Link
                        to={{ pathname: `/server/${data._id}`, data: data }}
                      >
                        <div className="row d-flex align-items-center mb-2">
                          <div className="col-9">
                            <h3 className="f-w-300 d-flex align-items-center m-b-0 capitalize">
                              <i className="feather icon-arrow-up text-c-green f-30 m-r-5 " />{" "}
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
                      </Link>
                    </Card.Body>
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
