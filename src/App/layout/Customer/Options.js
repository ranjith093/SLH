import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { animated } from "react-spring";

function Options({ style, onClick }) {
  return (
    <animated.div style={{ ...style }} className="w-full p-2  h-full  absolute">
      <Card className="  w-full h-full">
        <Card.Header>
          <Card.Title as="h5">Options</Card.Title>
        </Card.Header>

        <Card.Body>
          <Form className=" h-full w-full flex justify-between  flex-col overflow-y-auto overflow-x-hidden">
            <Row>
              <Col md={12}>
                {/* <h5>Options</h5>
                  <hr /> */}
                <Form.Group>
                  <Form.Check
                    custom
                    type="checkbox"
                    id="dialer"
                    label="Dialer"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Check custom type="checkbox" id="vb" label="VB" />
                </Form.Group>
              </Col>
            </Row>
            <Button className="self-end" variant="primary" onClick={onClick}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </animated.div>
  );
}

export default Options;
