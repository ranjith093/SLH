import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { animated } from "react-spring";
function Cpass({ style, onClick }) {
  return (
    <animated.div style={{ ...style }} className="w-full p-2  h-full  absolute">
      <Card>
        <Card.Header>
          <Card.Title as="h5">Cpass</Card.Title>
        </Card.Header>

        <Card.Body>
          <Form>
            <Row>
              <Col md={12}>
                {/* <h5>Options</h5>
                    <hr /> */}
                <Form.Group>
                  <Form.Check
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
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" onClick={onClick}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </animated.div>
  );
}

export default Cpass;
