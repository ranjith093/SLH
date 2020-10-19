import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Modal,
  Spinner,
} from "react-bootstrap";

import SkeletonCard from "../../components/SkeletonCard";

import { Formik } from "formik";

import Aux from "../../../hoc/_Aux";

import { Link } from "react-router-dom";

import { getApiCall, postApiCall } from "../../helpers/api-helper";

import MyVerticallyCenteredModalGet from "../../components/MyVerticallyCenteredModal";
import { v4 as uuid } from "uuid";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 20) {
    errors.name = "Must be 15 characters or less";
  }

  if (!values.url) {
    errors.url = "Required";
  } else if (!/^[A-Z0-9._%+-]+\.[A-Z]{2,4}[\s\S]*$/i.test(values.url)) {
    errors.url = "Invalid  URL";
  }

  if (!values.token) {
    errors.token = "Required";
  } else if (values.token.length > 20) {
    errors.token = "Must be 20 characters or less";
  }
  if (!values.key) {
    errors.key = "Required";
  } else if (values.key.length > 20) {
    errors.key = "Must be 20 characters or less";
  }

  return errors;
};

function MyVerticallyCenteredModal(props) {
  const { setCpass, account, ...props1 } = props;

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    console.log("submit press");
    setLoading(true);
    const path =
      Object.keys(account).length !== 0
        ? "cpaas/updateCpaas"
        : "cpaas/addCpaas";

    const { _id, ...values1 } = values;

    const body = {
      id: Object.keys(account).length !== 0 ? _id : uuid(),
      ...values1,
    };

    const json = await postApiCall(path, body);

    setCpass((preState) => {
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
        <Modal.Title id="contained-modal-title-vcenter">Add cpass</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik onSubmit={onSubmit} initialValues={account} validate={validate}>
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
                    isInvalid={errors.name}
                  />
                  {errors.name && (
                    <h6 className="py-1 text-red-500">{errors.name}</h6>
                  )}
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="url">
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={values.url}
                    placeholder="www.slashrtc.com"
                    onChange={handleChange}
                    isValid={touched.url && !errors.url}
                    isInvalid={errors.url}
                  />
                  {errors.url && (
                    <h6 className="py-1 text-red-500">{errors.url}</h6>
                  )}
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="token">
                  <Form.Label>Token</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Token"
                    value={values.token}
                    onChange={handleChange}
                    isValid={touched.token && !errors.token}
                    isInvalid={errors.token}
                  />
                  {errors.token && (
                    <h6 className="py-1 text-red-500">{errors.token}</h6>
                  )}
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="key">
                  <Form.Label>Key</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Key"
                    value={values.key}
                    onChange={handleChange}
                    isValid={touched.key && !errors.key}
                    isInvalid={errors.key}
                  />
                  {errors.key && (
                    <h6 className="py-1 text-red-500">{errors.key}</h6>
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
    const path = "cpaas/viewCpaas";
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
    const path = "cpaas/deleteCpaas";

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
                <Col key={data._id} md={6} xl={4} className="mb-4">
                  <>
                    <Card.Body
                      className="shadow-1"
                      style={{ marginTop: "20px", background: "white" }}
                    >
                      {" "}
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
                      <Link to={{ pathname: `/cpass/${data._id}`, data: data }}>
                        <div className="row d-flex align-items-center mb-2">
                          <div className="col-9">
                            <h3 className="f-w-300 d-flex align-items-center m-b-0 capitalize">
                              {data.name}
                            </h3>
                          </div>
                        </div>

                        <h6 className="my-2 text-gray-700">{data.url}</h6>

                        <div
                          className="progress mt-2"
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
