import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { animated } from "react-spring";

function Basicinfo({ style, onClick }) {
  return (
    <animated.div style={{ ...style }} className=" h-full w-full p-2 absolute">
      <Card className="  w-full h-full">
        <Card.Header>
          <Card.Title as="h5">Basic User</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form className=" h-full w-full flex justify-between items-center flex-col overflow-y-auto overflow-x-hidden">
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
            <Button className="self-end" variant="primary" onClick={onClick}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </animated.div>
  );
}

export default Basicinfo;
