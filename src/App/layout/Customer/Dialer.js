import { Formik } from "formik";
import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { animated } from "react-spring";
import OptionCard from "./common/OptionCard";
function Dialer({ style, onClick }) {
  const validation = (values) => {
    const errors = {};
    console.log("validation dialer values :", values);
    return errors;
  };
  const onSubmit = (values) => {
    console.log("form submit Dialer values :", values);
  };

  // const OptionCard = (props) => (
  //   <div
  //     className={` ${
  //       props.name === props.value ? "bg-blue-500 " : "bg-gray-100 "
  //     }  w-32 h-20 justify-between flex  flex-col  shadow-md rounded-lg p-2 m-2 `}
  //   >
  //     {props.children}
  //   </div>
  // );

  return (
    <animated.div style={{ ...style }} className="w-full p-2  h-full  absolute">
      <Card className="  w-full h-full">
        <Card.Header>
          <Card.Title as="h5">Dialer</Card.Title>
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
              <Form
                onSubmit={handleSubmit}
                className=" h-full w-full flex justify-between  flex-col overflow-y-auto overflow-x-hidden"
              >
                <Row>
                  <Col md={12}>
                    {/* <h5>Licence</h5>
                      <hr /> */}
                    <Form.Group controlId="licence">
                      <Form.Label>Licence</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={handleChange}
                        placeholder="licence"
                        // isInvalid={errors.licence}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <h5>Database</h5>
                    <hr />
                    <Form.Group controlId="check">
                      <Row className="ml-1">
                        <OptionCard name={values.supportedRadio} value="mongo">
                          <Form.Check
                            inline
                            custom
                            type="radio"
                            label=""
                            name="supportedRadio"
                            value="mongo"
                            onChange={handleChange}
                            id="supportedRadio23"
                            // className="bg-gray-100 w-32 h-20 flex justify-center items-center shadow-md rounded-lg"
                          />
                          <h4
                            className={`${
                              values.supportedRadio === "mongo"
                                ? "text-white"
                                : "bg-gray-100"
                            }`}
                          >
                            Mongo
                          </h4>
                        </OptionCard>

                        <OptionCard name={values.supportedRadio} value="sql">
                          <Form.Check
                            inline
                            custom
                            type="radio"
                            label=""
                            value="sql"
                            onChange={handleChange}
                            name="supportedRadio"
                            id="supportedRadio24"
                            // className=" w-32 h-20 flex justify-center items-center shadow-md rounded-lg po"
                            // children={<div onClick={handleChange}>hi</div>}
                          />
                          <h4
                            className={`${
                              values.supportedRadio === "sql"
                                ? "text-white"
                                : "bg-gray-100"
                            }`}
                          >
                            SQL
                          </h4>
                        </OptionCard>
                      </Row>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <h5>Features</h5>
                    <hr />
                    <Form.Group>
                      <Form.Check
                        custom
                        type="checkbox"
                        id="dialer"
                        onChange={handleChange}
                        label="Dialer"
                      />
                      <Form.Check
                        custom
                        type="checkbox"
                        id="dialer"
                        onChange={handleChange}
                        label="Dialer"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  className="self-end"
                  variant="primary"
                  type="submit"
                  // onClick={onClick}
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

export default Dialer;
