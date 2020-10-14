import { Formik } from "formik";
import { element } from "prop-types";
import React, { Children } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";

function MyVerticallyCenteredModal(props) {
  const { title, body, ...props1 } = props;

  return (
    <Modal
      {...props1}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;

//use Case
// const [modalShow, setModalShow] = useState(initialState)
// <MyVerticallyCenteredModal
//   show={modalShow}
//   onHide={() => setModalShow(false)}
// />;
