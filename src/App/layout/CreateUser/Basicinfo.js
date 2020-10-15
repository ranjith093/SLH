import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { animated } from "react-spring";

function Basicinfo({ style, onClick }) {
  return (
    <animated.div style={{ ...style }} className=" absolute h-full w-full p-2">
      <Card>
        <Card.Header>
          <Card.Title as="h5">Basic User</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Form.Group as={Col} md="6" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" />
                {/* <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text> */}
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder="Phone" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" placeholder="Company" />
              </Form.Group>
              {/* <Form.Group controlId="formBasicChecbox">
                      <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
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

export default Basicinfo;
