import { v4 as uuid } from "uuid";

import config from "../../config";

export const getApiCall = (path) => {
  //   const path = "dip";
  const url = `${config.defaultUrl}/${path}`;

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      // console.log("data api", json);
      // {status: "success", id: "5f803ae8a4f3cd169bfe0740"}
      if (json.status !== "success") {
        // console.log(json.error);
        return;
      }
      return json;
    });
};

export const postApiCall = (path, values) => {
  const url = `${config.defaultUrl}/${path}`;

  const body = { id: uuid(), ...values };

  const { _id, ...values1 } = values;

  console.log("post body ", body);
  console.log("post body values", { id: _id, ...values1 });

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  };
  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      // console.log("data api", json);
      // {status: "success", id: "5f803ae8a4f3cd169bfe0740"}
      if (json.status !== "success") {
        // console.log(json.error);
        return;
      }
      return json;
    });
};