import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Aux from "../../../hoc/_Aux";
import settingsItem from "../../routes/settings-items";

function Index() {
  return (
    <Aux>
      <Row>
        <Col>
          <Row>
            {/* EXPECTED Cpass  
          cpass=   [
              {
                  "id": "5f804458e318062dd0d888ba",
                  "name": "name",
                  "url": "url",
                  "token": "token ",
                  "key": "key"
              },
              {
                  "id": "5f804603e318062dd0d888bb",
                  "name": "vedantu",
                  "url": "vedantu.slashrtc.in",
                  "token": "vedantuGateway",
                  "key": "507130"
              }
          ] */}

            {settingsItem &&
              settingsItem.items.map((data) => (
                <Col key={data.id} md={6} xl={4} className="mb-4">
                  <>
                    <Link to={{ pathname: `/${data.id}`, data: data }}>
                      <Card.Body
                        className="shadow-1"
                        style={{ marginTop: "20px", background: "white" }}
                      >
                        <div className="row d-flex align-items-center mb-2">
                          <div className="col-9">
                            <h3 className="f-w-300 d-flex align-items-center m-b-0">
                              <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{" "}
                              {data.title}
                            </h3>
                          </div>

                          {/* <div className="col-3 text-right">
                            <p className="m-b-0">{data.key}</p>
                          </div> */}
                        </div>
                        <Row>
                          <h6 className="ml-4">{data.ip}</h6>
                          <h6 className="ml-1">:</h6>
                          <h6 className="ml-1">{data.port}</h6>
                        </Row>

                        <div
                          className="progress m-t-20"
                          style={{ height: "7px" }}
                        >
                          <div
                            className="progress-bar progress-c-theme"
                            role="progressbar"
                            style={{ width: "50%" }}
                            aria-valuenow="50"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          />
                        </div>
                      </Card.Body>
                    </Link>
                  </>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Aux>
  );
}

export default Index;
