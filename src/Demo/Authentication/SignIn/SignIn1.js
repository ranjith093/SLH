import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// import { AuthContext } from "../../../App";

import { AuthContext } from "../../../App/state/context";

import "./../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { Spinner } from "react-bootstrap";

const SignUp1 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, state } = useContext(AuthContext);
  // console.log("auth context in sign in", signIn);

  const login = () => {
    if (email && password) {
      setLoading(true);
      signIn({ email, password });
    }

    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ username: email, password: password }),
    // };
    // fetch("http://localhost:5000/login", requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("data api", data);
    //     localStorage.setItem("token", data.token);
    //     // setToken(true);
    //   });
  };

  useEffect(() => {
    return () => {};
  }, []);

  console.log("state signin ", state);
  return (
    <Aux>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <h3 className="mb-4">Login</h3>

              <div className="input-group mb-3">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="input-group mb-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  placeholder="password"
                />
              </div>
              {state.error && (
                <div className="form-group text-left mb-4 ml-2">
                  <p style={{ color: "red" }}>{state.error}</p>
                </div>
              )}

              {/* <div className="form-group text-left">
                <div className="checkbox checkbox-fill d-inline">
                  <input
                    type="checkbox"
                    name="checkbox-fill-1"
                    id="checkbox-fill-a1"
                  />
                  <label htmlFor="checkbox-fill-a1" className="cr">
                    {" "}
                    Save credentials
                  </label>
                </div>
              </div> */}
              <button className="btn btn-primary shadow-2 mb-4" onClick={login}>
                {loading ? <Spinner animation="border" /> : "login"}
                {/* Login */}
              </button>
              <p className="mb-2 text-muted">
                Forgot password?{" "}
                <NavLink to="/auth/reset-password-1">Reset</NavLink>
              </p>
              <p className="mb-0 text-muted">
                Don’t have an account?{" "}
                <NavLink to="/auth/signup">Signup</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default SignUp1;
