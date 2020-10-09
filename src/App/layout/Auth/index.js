import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import route from "../../../route";

function index() {
  const menu = route.map((route, index) => {
    return route.component ? (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={(props) => <route.component {...props} />}
      />
    ) : null;
  });

  return (
    <div>
      <Switch>
        {/* <Redirect from="/" to="auth/signin" /> */}
        {menu}
        <Redirect from="/" to="/auth/signin" />
      </Switch>
    </div>
  );
}

export default index;
