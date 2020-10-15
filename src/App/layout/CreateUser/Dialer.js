import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { animated } from "react-spring";

function Dialer({ style, onClick }) {
  return (
    <animated.div style={{ ...style }} className="w-full p-2  h-full  absolute">
      <Card>
        <Card.Header>
          <Card.Title as="h5">Dialer</Card.Title>
        </Card.Header>

        <Card.Body>
          <Form>
            <Row>
              <Col md={12}>
                {/* <h5>Licence</h5>
                      <hr /> */}
                <Form.Group controlId="licence">
                  <Form.Label>Licence</Form.Label>
                  <Form.Control type="text" placeholder="licence" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <h5>Database</h5>
                <hr />
                <Form.Group>
                  <Form.Check
                    inline
                    custom
                    type="radio"
                    label="mongo"
                    name="supportedRadio"
                    id="supportedRadio23"
                    className="bg-gray-100 w-32 h-20 flex justify-center items-center shadow-md rounded-lg"
                  />
                  <Form.Check
                    inline
                    custom
                    type="radio"
                    label="sql"
                    name="supportedRadio"
                    id="supportedRadio24"
                    className="bg-gray-100 w-32 h-20 flex justify-center items-center shadow-md rounded-lg po"
                  />
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
                    label="Dialer"
                  />
                  <Form.Check
                    custom
                    type="checkbox"
                    id="dialer"
                    label="Dialer"
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

export default Dialer;
