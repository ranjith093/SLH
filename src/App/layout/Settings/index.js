import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Aux from "../../../hoc/_Aux";
import settingsItem from "../../routes/settings-items";

function Index() {
  const SettingItem = ({ items }) => {
    return items.map((data) => (
      <div className="m-4" key={data.id}>
        <>
          <Link to={{ pathname: `/${data.id}`, data: data }}>
            <div className="w-40 h-40 bg-white shadow-md rounded-md flex flex-col justify-center items-center">
              {/* <i className="feather icon-lock " /> */}
              {data.title}
            </div>
          </Link>
        </>
      </div>
    ));
  };

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
                <>
                  <div
                    className="lg:flex flex-row items-center ml-3"
                    key={data.id}
                  >
                    <div className="capitalize lg:w-56 lg:flex justify-center items-center">
                      {data.title}
                    </div>
                    <div className="flex flex-wrap">
                      <SettingItem items={data.settings} />
                    </div>
                  </div>
                  {/* <div className="h-1 rounded-sm w-full bg-gray-300 " /> */}
                </>
              ))}
          </Row>
        </Col>
      </Row>
    </Aux>
  );
}

export default Index;
