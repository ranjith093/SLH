import React from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

import Aux from "../../../hoc/_Aux";

class Cpass extends React.Component {
  render() {
    return (
      <Aux>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Cpass</Card.Title>
              </Card.Header>
              <Card.Body>
                <h5>Form controls</h5>
                <hr />
                <Row>
                  <Col md={6}>
                    <Form>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" />
                        {/* <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                        </Form.Text> */}
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Domain</Form.Label>
                        <Form.Control type="text" placeholder="Domain" />
                      </Form.Group>
                      <Form.Group controlId="formBasicChecbox">
                        <Form.Check type="checkbox" label="Check me out" />
                      </Form.Group>
                      <Button variant="primary">Submit</Button>
                    </Form>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Text</Form.Label>
                      <Form.Control type="email" placeholder="Text" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Example select</Form.Label>
                      <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Form.Group>
                    {/* <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Example textarea</Form.Label>
                      <Form.Control as="textarea" rows="3" />
                    </Form.Group> */}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default Cpass;
