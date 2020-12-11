import { v4 as uuid } from "uuid";

import config from "../../config";

export const getApiCall = (path, id) => {
  const filter = id && `?id=${id}`;

  const url = `${config.defaultUrl}/${path}${filter ? filter : ""}`;
  console.log("get url = ", url);

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      // if (json.status !== "success") {
      //   return;
      // }
      return json;
    });
};

export const postApiCall = (path, values) => {
  const url = `${config.defaultUrl}/${path}`;

  // const { _id, ...values1 } = values;

  // console.log("post body values", { id: _id, ...values1 });
  console.log("post body values", values);

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

export const getReportApiCall = (path, id) => {
  const filter = id && `?id=${id}`;

  const url = `${config.leadReportUrl}/${path}${filter ? filter : ""}`;
  console.log("get url = ", url);

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  return fetch(url, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      // if (json.status !== "success") {
      //   return;
      // }
      return json;
    });
};

export const postReportApiCall = (path, values) => {
  const url = `${config.leadReportUrl}/${path}`;

  // const { _id, ...values1 } = values;

  // console.log("post body values", { id: _id, ...values1 });
  console.log("post body values", values);

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

export const deleteReportApiCall = (path, values) => {
  const url = `${config.leadReportUrl}/${path}`;

  // const { _id, ...values1 } = values;

  // console.log("post body values", { id: _id, ...values1 });
  console.log("post body values", values);

  const requestOptions = {
    method: "DELETE",
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
