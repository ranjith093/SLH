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
  SplitButton,
  ButtonGroup,
} from "react-bootstrap";
import { Formik } from "formik";

import MyVerticallyCenteredModalGet from "../../components/MyVerticallyCenteredModal";
import { getReportApiCall, postReportApiCall, deleteReportApiCall } from "../../helpers/api-helper";

import TableSkeletonCard from "../../components/TableSkeletonCard";
import { v4 as uuid } from "uuid";

const validate = (values) => {
  const errors = {};
  if (!values.leadDate) {
    errors.leadDate = "Required";
  } 
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 50) {
    errors.name = "Must be 50 characters or less";
  }
  if (!values.mobileNumber) {
    errors.mobileNumber = "Required";
  } else if (values.mobileNumber.length < 10) {
    errors.mobileNumber = "Must be 10 characters";
  }
  if (!values.whatsAppNumber) {
    errors.whatsAppNumber = "Required";
  } else if (values.whatsAppNumber.length < 10) {
    errors.whatsAppNumber = "Must be 10 characters";
  }
  if (!values.panNumber) {
    errors.panNumber = "Required";
  } else if (values.panNumber.length < 10 || values.panNumber.length > 10) {
    errors.panNumber = "Must be 10 characters";
  }
  
  // if (!values.domain) {
  //   errors.domain = "Required";
  // } else if (!/^[A-Z0-9._%+-]+\.[A-Z]{2,4}[\s\S]*$/i.test(values.domain)) {
  //   errors.domain = "Invalid  Domain";
  // } else if (values.domain.length > 20) {
  //   errors.domain = "Must be 15 characters or less";
  // }

  return errors;
};

function MyVerticallyCenteredModal(props) {
  const { setLeadReports, leadReport , ...props1 } = props;
  // console.log("account edit", account);

  const onSubmit = async (values) => {
    const { _id, ...values1 } = values;

    const body = {
      
      id: Object.keys(leadReport).length !== 0 ? _id : uuid(),
      ...values1,
    };

    const path =
      Object.keys(leadReport).length !== 0
        ? "reports/:id"
        : "reports/add";
    const json = await postReportApiCall(path, body);

    setLeadReports((preState) => {
      console.log("pre state set account", preState);
      if (!json) {
        return preState;
      }
      if (preState) {
        if (Object.keys(leadReport).length !== 0) {
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
          Add Lead Report Data
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          // validationSchema={schema}
          enableReinitialize={true}
          onSubmit={onSubmit}
          initialValues={leadReport}
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
                <Form.Group as={Col} md="6" controlId="leadDate">
                  <Form.Label>Leads Date</Form.Label>
                  <Form.Control
                    type="date"    
                    onChange={handleChange}
                    value={values.leadDate}
                    isValid={!errors.leadDate}
                    isInvalid={!!errors.leadDate}
                  />
                  {errors.leadDate && (
                    <h6 className="py-1 text-red-500">{errors.leadDate}</h6>
                  )}
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="www.slashrtc.com "
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  {errors.name && (
                    <h6 className="py-1 text-red-500">{errors.name}</h6>
                  )}
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="mobileNumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Mobile Number"
                    value={values.mobileNumber}
                    onChange={handleChange}
                    isInvalid={!!errors.mobileNumber}
                  />
                  {errors.mobileNumber && (
                    <h6 className="py-1 text-red-500">{errors.mobileNumber}</h6>
                  )}
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="whatsAppNumber">
                  <Form.Label>WhatsApp Number</Form.Label>
                  <Form.Control
                    type="number"
                    value={values.whatsAppNumber}
                    placeholder="WhatsApp Number"
                    onChange={handleChange}
                    isInvalid={!!errors.whatsAppNumber}
                  />
                  {errors.whatsAppNumber && (
                    <h6 className="py-1 text-red-500">{errors.whatsAppNumber}</h6>
                  )}
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="panNumber">
                  <Form.Label>PAN Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={values.panNumber}
                    placeholder="Enter Pan Number"
                    onChange={handleChange}
                    isInvalid={!!errors.panNumber}
                  />
                  {errors.panNumber && (
                    <h6 className="py-1 text-red-500">{errors.panNumber}</h6>
                  )}
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="type">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={values.type}
                    onChange={handleChange}
                  >
                    <option>IRDA</option>
                    <option>SAHI</option>
                  </Form.Control>
                
                </Form.Group>
              </Form.Row>

              <Button variant="primary" type="submit">
                {Object.keys(leadReport).length !== 0 ? "Update" : "Submit"}
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

  const [leadReports, setLeadReports] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  const [leadReport, setLeadReport] = useState({});

  const [deletConfirm, setDeletConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const path = `reports`;
    const json = await getReportApiCall(path, id);
    console.log("json account ", json);
    if (json) {
      setLeadReports(json.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  const onDelete = async () => {
    const path = "reports/:id";

    const body = { id: leadReport._id };

    const json = await deleteReportApiCall(path, body);
    if (json) {
      setLeadReports((preState) => {
        if (preState) {
          setDeletConfirm(false);
          return preState.filter((item) => item._id !== leadReport._id);
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
            setLeadReport({});
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
        setLeadReports={setLeadReports}
        leadReport={leadReport}
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
          <Card.Title as="h5">Leads Report Table</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Lead Date</th>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>WhatsApp Number</th>
                <th>PAN Number</th>
                <th>
                  <td style={{ padding: "0" }}>
                    {[SplitButton].map((DropdownType, idx) => (
                      <DropdownType
                        as={ButtonGroup}
                        key={idx}
                        id={`dropdown-button-drop-${idx}`}
                        size="sm"
                        variant="secondary"
                        title="Type"
                      >
                        <Dropdown.Item eventKey="1">IRDA</Dropdown.Item>
                        <Dropdown.Item eventKey="2">SAHI</Dropdown.Item>
                      </DropdownType>
                    ))}
                  </td>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && <TableSkeletonCard col={6} />}
              {leadReports &&
                leadReports.map((data, i) => (
                  <tr key={data._id}>
                    <th scope="row">{i + 1}</th>
                    <td>{data.leadDate}</td>
                    <td>{data.name}</td>
                    <td>{data.mobileNumber}</td>
                    <td>{data.whatsAppNumber}</td>
                    <td>{data.panNumber}</td>
                    <td>{data.type}</td>
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
                          setLeadReport(data);
                          setModalShow(true);
                        }}
                      />
                      <i
                        className="feather icon-trash
                       auth-icon ml-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setLeadReport(data);
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
