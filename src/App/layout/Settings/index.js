import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Aux from "../../../hoc/_Aux";
import settingsItem from "../../routes/settings-items";

function Index() {
  const SettingItem = ({ items }) => {
    return items.map((data) => (
      <div className="m-4" key={data.id}>
        <>
          <Link to={{ pathname: `/${data.id}`, data: data }}>
            <div className="w-40 h-40 bg-white shadow-md rounded-md flex flex-col justify-center items-center transform hover:scale-110 hover:shadow-lg duration-300">
              <i
                class={`fa ${data.icon} fa-4x mb-2 `}
                style={{ color: "#3F4D67" }}
                aria-hidden="true"
              />
              <h6 className="text-gray-600"> {data.title}</h6>
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
                </>
              ))}
          </Row>
        </Col>
      </Row>
    </Aux>
  );
}

export default Index;
