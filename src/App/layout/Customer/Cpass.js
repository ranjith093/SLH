import { Formik } from "formik";
import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { animated } from "react-spring";
import OptionCard from "./common/OptionCard";
function Cpass({ style, onClick }) {
  const validation = (values) => {
    const errors = {};
    console.log("validation dialer values :", values);
    return errors;
  };
  const onSubmit = (values) => {
    console.log("form submit Dialer values :", values);
  };

  return (
    <animated.div style={{ ...style }} className="w-full p-2  h-full absolute">
      <Card className="  w-full h-full">
        <Card.Header>
          <Card.Title as="h5">Cpass</Card.Title>
        </Card.Header>

        <Card.Body>
          <Formik onSubmit={onSubmit} initialValues={{}} validate={validation}>
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form className=" h-full w-full flex justify-between  flex-col overflow-y-auto overflow-x-hidden">
                <Row>
                  <Col md={12}>
                    {/* <h5>Options</h5>
                    <hr /> */}
                    <Form.Group>
                      <Row className="ml-1">
                        <OptionCard
                          name={values.supportedRadio1}
                          value="cpass1"
                        >
                          <Form.Check
                            inline
                            custom
                            type="radio"
                            label=""
                            name="supportedRadio1"
                            value="cpass1"
                            onChange={handleChange}
                            id="supportedRadio23"
                            // className="bg-gray-100 w-32 h-20 flex justify-center items-center shadow-md rounded-lg"
                          />
                          <h4
                            className={`${
                              values.supportedRadio1 === "cpass1"
                                ? "text-white"
                                : "bg-gray-100"
                            }`}
                          >
                            Cpass 1
                          </h4>
                        </OptionCard>
                        <OptionCard
                          name={values.supportedRadio1}
                          value="cpass2"
                        >
                          <Form.Check
                            inline
                            custom
                            type="radio"
                            label=""
                            name="supportedRadio1"
                            value="cpass2"
                            onChange={handleChange}
                            id="supportedRadio24"
                            // className="bg-gray-100 w-32 h-20 flex justify-center items-center shadow-md rounded-lg"
                          />
                          <h4
                            className={`${
                              values.supportedRadio1 === "cpass2"
                                ? "text-white"
                                : "bg-gray-100"
                            }`}
                          >
                            Cpass2
                          </h4>
                        </OptionCard>
                      </Row>
                      {/* <Form.Check
                        inline
                        custom
                        type="radio"
                        label="cpass 1"
                        name="supportedRadio"
                        id="supportedRadio21"
                      />
                      <Form.Check
                        inline
                        custom
                        type="radio"
                        label="cpass 2"
                        name="supportedRadio"
                        id="supportedRadio22"
                      /> */}
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  className="self-end"
                  variant="primary"
                  onClick={onClick}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </animated.div>
  );
}

export default Cpass;
