export const requestQuery = (body, path) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return fetch(`http://localhost:5000/${path}`, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      //   console.log("data api", json);
      return json;
      //   if (json.status === "fail") {
      //     // {status: "fail", error: "user not exist"}
      //     dispatch({ type: "SET_ERROR", error: json.error });
      //     return;
      //   }

      //   localStorage.setItem("userToken", json.token);
      //   localStorage.setItem("userId", json._id);
      //   dispatch({ type: "SIGN_IN", token: json.token, id: json._id });
      // setToken(true);
    });
};
