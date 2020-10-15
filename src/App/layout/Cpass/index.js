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

import MyFormGroup from "../../components/MyFormGroup";
import { getApiCall, postApiCall } from "../../helpers/api-helper";
import { v4 as uuid } from "uuid";

const validate = (values) => {
  // console.log("validate");
  const errors = {};
  if (!values.name) {
    // console.log("name error");
    errors.name = "Required";
  } else if (values.name.length > 10) {
    // console.log("length more");
    errors.name = "Must be 15 characters or less";
  }

  if (!values.url) {
    errors.url = "Required";
  } else if (!/^[A-Z0-9._%+-]+\.[A-Z]{2,4}[\s\S]*$/i.test(values.url)) {
    errors.url = "Invalid  URL";
  }
  //  else if (values.url.length > 20) {
  //   errors.url = "Must be 20 characters or less";
  // }
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
  // console.log("error", errors);

  return errors;
};

function MyVerticallyCenteredModal(props) {
  // console.log("props", { ...props });
  const { setCpass, ...props1 } = props;
  // const passto = (entry, values) => {
  //   console.log("values from modal pass to", values);
  // };

  const onSubmit = async (values) => {
    // console.log("values ", values);

    const path = "cpaas/addCpaas";
    const body = { id: uuid(), ...values };
    const json = await postApiCall(path, body);
    const entry = {
      id: json.id,
    };
    setCpass((preState) => [...preState, Object.assign(entry, values)]);
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
                    placeholder="slashrtc"
                    onChange={handleChange}
                    // isValid={touched.name && !errors.name}
                    isInvalid={errors.name}
                  />
                </Form.Group>
                {/* <MyFormGroup
                  errors={errors}
                  handleChange={handleChange}
                  name="url"
                /> */}
                <Form.Group as={Col} md="6" controlId="url">
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="www.slashrtc.com"
                    onChange={handleChange}
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
                    onChange={handleChange}
                    // isInvalid={errors.token}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="key">
                  <Form.Label>Key</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Key"
                    onChange={handleChange}
                    // isInvalid={errors.key}
                  />
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

const Cpass = () => {
  const [cpass, setCpass] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  const getData = async () => {
    const path = "cpaas/viewCpaas";
    const json = await getApiCall(path);
    console.log("json helper", json);
    setCpass(json.data);
  };

  useEffect(() => {
    getData();
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
                <Col key={data._id} md={6} xl={4} className="mb-4">
                  <>
                    <Link to={{ pathname: `/cpass/${data._id}`, data: data }}>
                      <Card.Body
                        className="shadow-1"
                        style={{ marginTop: "20px", background: "white" }}
                      >
                        <h6 className="mb-4">{data.url}</h6>
                        <div className="row d-flex align-items-center mb-2">
                          <div className="col-9">
                            <h3 className="f-w-300 d-flex align-items-center m-b-0">
                              {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{" "} */}
                              {data.name}
                            </h3>
                          </div>

                          {/* <div className="col-3 text-right">
                            <p className="m-b-0">{data.key}</p>
                          </div> */}
                        </div>

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
