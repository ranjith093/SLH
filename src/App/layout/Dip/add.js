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
import { getApiCall, postApiCall } from "../../helpers/api-helper";

import TableSkeletonCard from "../../components/TableSkeletonCard";
import { v4 as uuid } from "uuid";
import config from "../../../config";
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
  const { setAccounts, account, id, ...props1 } = props;

  const onSubmit = async (values) => {
    console.log("values ", { id, ...values });

    const body = { cloudCarrierId: id, id: uuid(), ...values };

    // const path = "cpaasAcocunts/addCpaasAccount";
    const path =
      Object.keys(account).length !== 0
        ? "cloudCarrierNumbers/addCloudCarrierNumber"
        : "cloudCarrierNumbers/addCloudCarrierNumber";
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
        return [...preState, body];
      }
      return [json];
    });
    props.onHide();
  };
  const onSubmitRange = async (values) => {
    console.log("range values", values);

    // const numbers = [];
    // let i;
    // for (i = values.numberFrom; (i = values.numberTo); i++) {
    //   numbers.push({
    //     number: i,
    //   });
    // }

    // console.log("numbers push", numbers);

    const body = { cloudCarrierId: id, id: uuid(), ...values };

    const path =
      Object.keys(account).length !== 0
        ? "cloudCarrierNumbers/addCloudCarrierNumber"
        : "cloudCarrierNumbers/addCloudCarrierNumber";
    const json = await postApiCall(path, body);
    console.log("json add account ", json);
    // const entry = {
    //   id: json.id,
    // };
    const getData = async () => {
      const path = `cloudCarrierNumbers/viewCloudCarrierNumber`;
      const json = await getApiCall(path, id);
      console.log("json account ", json);
      setAccounts(json.data);
      // setLoading(false);
    };
    getData();

    // setAccounts((preState) => {
    //   console.log("pre state set account", preState);
    //   if (!json) {
    //     return preState;
    //   }
    //   if (preState) {
    //     return [...preState, body];
    //   }
    //   return [json];
    // });
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
        <Modal.Title id="contained-modal-title-vcenter">Add Number</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Accordion defaultActiveKey="0">
          <div>hi</div>
          {/* <Card>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Single Entry
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="0">
              <Formik
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

                      <Form.Group as={Col} md="6" controlId="statuss">
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
          </Card> */}
          <Card>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Range Entry
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="1">
              <Formik
                // validationSchema={schema}
                onSubmit={onSubmitRange}
                initialValues={{}}
                // validate={validateRange}
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
                      <Form.Group as={Col} md="6" controlId="numberFrom">
                        <Form.Label>Number From</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Number"
                          onChange={handleChange}
                          isValid={touched.name && !errors.name}
                          // isInvalid={!!errors.numberFrom}
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="numberTo">
                        <Form.Label>Number To</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Number"
                          onChange={handleChange}
                          isValid={touched.name && !errors.name}
                          // isInvalid={!!errors.numberTo}
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="6" controlId="status">
                        <Form.Label>Status</Form.Label>

                        <Form.Control
                          size="sm"
                          as="select"
                          defaultValue="select"
                          onChange={handleChange}
                          // isInvalid={!!errors.status}
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
  const id = props.location.data._id;
  const name = props.location.data.name;
  const url = props.location.data.url;
  console.log(props.location.data);

  const [accounts, setAccounts] = useState([]);

  const [account, setAccount] = useState({});
  const [number, setnumber] = useState();

  const [modalShow, setModalShow] = React.useState(false);
  const [deletConfirm, setDeletConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const path = `cloudCarrierNumbers/viewCloudCarrierNumber`;
    const json = await getApiCall(path, id);
    console.log("json account ", json);
    setAccounts(json.data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  const onDelete = async () => {
    const path = "cloudCarrierNumbers/deleteSingleCloudCarrierNumber";

    const url = `${config.defaultUrl}/${path}?id=${account}&number=${number}`;
    console.log("get url = ", url);

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        // if (json.status !== "success") {
        //   return;
        // }
        // return json;
        if (json) {
          setAccounts((preState) => {
            if (preState) {
              setDeletConfirm(false);

              // console.log("preState", preState);
              const result = preState.map((item) => ({
                ...item,
                numbers: item.numbers.filter(
                  (child) => child.number !== number
                ),
              }));
              console.log("result", result);
              return result;
              // return [...preState, body];
            }
            return [];
          });
        }
      });
  };

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
          <Card.Title as="h5">Numbers</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Number</th>
                <th>Status</th>
                <th>Actions</th>
                {/* <th>Port</th>
                <th>Type</th> */}
              </tr>
            </thead>
            <tbody>
              {loading && <TableSkeletonCard col={4} />}
              {accounts &&
                accounts.map((data) =>
                  data.numbers.map((number, i) => (
                    <tr key={number.number}>
                      <th scope="row">{i + 1}</th>
                      <td>{number.number}</td>
                      <td>{data.status}</td>

                      <td style={{}}>
                        <i
                          className="feather icon-trash
                       auth-icon ml-3"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setnumber(number.number);
                            setAccount(data._id);
                            setDeletConfirm(true);
                          }}
                        />
                      </td>
                    </tr>
                  ))
                )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Aux>
  );
}

export default Add;
