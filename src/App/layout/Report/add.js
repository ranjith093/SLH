import React, { useEffect, useState } from "react";
import Aux from "../../../hoc/_Aux";
import { Row, Col, Card, Table, Form, Button, Modal } from "react-bootstrap";
import { Formik } from "formik";

import MyVerticallyCenteredModalGet from "../../components/MyVerticallyCenteredModal";
import { getApiCall, postApiCall } from "../../helpers/api-helper";

import TableSkeletonCard from "../../components/TableSkeletonCard";
import { v4 as uuid } from "uuid";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 10) {
    errors.name = "Must be 15 characters or less";
  }
  if (!values.gateway) {
    errors.gateway = "Required";
  } else if (values.gateway.length > 10) {
    errors.gateway = "Must be 15 characters or less";
  }
  if (!values.callerID) {
    errors.callerID = "Required";
  } else if (values.callerID.length > 20) {
    errors.callerID = "Must be 15 characters or less";
  }
  if (!values.domain) {
    errors.domain = "Required";
  } else if (!/^[A-Z0-9._%+-]+\.[A-Z]{2,4}[\s\S]*$/i.test(values.domain)) {
    errors.domain = "Invalid  Domain";
  } else if (values.domain.length > 20) {
    errors.domain = "Must be 15 characters or less";
  }

  return errors;
};

function MyVerticallyCenteredModal(props) {
  const { setAccounts, account, id, ...props1 } = props;
  // console.log("account edit", account);

  const onSubmit = async (values) => {
    const { _id, ...values1 } = values;

    const body = {
      cpaasAccountId: id,
      id: Object.keys(account).length !== 0 ? _id : uuid(),
      ...values1,
    };

    const path =
      Object.keys(account).length !== 0
        ? "cpaasAcocunts/updateCpaasAccount"
        : "cpaasAcocunts/addCpaasAccount";
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
          Add Accounts
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          // validationSchema={schema}
          enableReinitialize={true}
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
                <Form.Group as={Col} md="6" controlId="domain">
                  <Form.Label>Domain</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="www.slashrtc.com "
                    value={values.domain}
                    onChange={handleChange}
                    isInvalid={!!errors.domain}
                  />
                  {errors.domain && (
                    <h6 className="py-1 text-red-500">{errors.domain}</h6>
                  )}
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="gateway">
                  <Form.Label>Gate Way</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Gateway"
                    value={values.gateway}
                    onChange={handleChange}
                    isInvalid={!!errors.gateway}
                  />
                  {errors.gateway && (
                    <h6 className="py-1 text-red-500">{errors.gateway}</h6>
                  )}
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="callerID">
                  <Form.Label>Caller Id</Form.Label>
                  <Form.Control
                    type="text"
                    value={values.callerID}
                    placeholder="Enter Caller Id"
                    onChange={handleChange}
                    isInvalid={!!errors.callerID}
                  />
                  {errors.callerID && (
                    <h6 className="py-1 text-red-500">{errors.callerID}</h6>
                  )}
                </Form.Group>
              </Form.Row>

              <Button variant="primary" type="submit">
                {Object.keys(account).length !== 0 ? "Update" : "Submit"}
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
  const [modalShow, setModalShow] = React.useState(false);

  const [account, setAccount] = useState({});

  const [deletConfirm, setDeletConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const path = `cpaasAcocunts/viewCpaasAccountById`;
    const json = await getApiCall(path, id);
    console.log("json account ", json);
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
    const path = "cpaasAcocunts/deleteCpaasAccount";

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
          <Card.Title as="h5">Accounts</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Gateway</th>
                <th>Caller ID</th>
                <th>Domain</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && <TableSkeletonCard col={6} />}
              {accounts &&
                accounts.map((data, i) => (
                  <tr key={data._id}>
                    <th scope="row">{i + 1}</th>
                    <td>{data.name}</td>
                    <td>{data.gateway}</td>
                    <td>{data.callerID}</td>
                    <td>{data.domain}</td>
                    <td
                      style={
                        {
                          // background: "red",
                          // display: "flex",
                          // justifyContent: "flex-end",
                        }
                      }
                    >
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
