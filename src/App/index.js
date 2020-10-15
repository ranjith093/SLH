import React, {
  Component,
  createContext,
  Suspense,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loadable from "react-loadable";

import { AuthContext, DataContext } from "./state/context";

import "../../node_modules/font-awesome/scss/font-awesome.scss";

import Loader from "./layout/Loader";
import Aux from "../hoc/_Aux";
import ScrollToTop from "./layout/ScrollToTop";
import routes from "../route";

import AuthScreen from "./layout/Auth";
import config from "../config";
import "../assets/tw/styles.css";

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader,
});

function App() {
  //State
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            userId: action.id,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userId: action.id,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userId: null,
          };
        case "SET_ERROR":
          return {
            ...prevState,
            error: action.error,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userId: null,
    }
  );
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      let userId;

      try {
        userToken = await localStorage.getItem("userToken");
        userId = await localStorage.getItem("userId");
        // console.log("user token", userToken)
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken, id: userId });
    };
    bootstrapAsync();
    return () => {};
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        console.log("signIn data", data);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: data.email,
            password: data.password,
          }),
        };
        fetch(`${config.defaultUrl}/login`, requestOptions)
          .then((response) => response.json())
          .then((json) => {
            console.log("data api", json);
            if (json.status === "fail") {
              // {status: "fail", error: "user not exist"}
              dispatch({ type: "SET_ERROR", error: json.error });
              return;
            }

            localStorage.setItem("userToken", json.token);
            localStorage.setItem("userId", json._id);
            dispatch({ type: "SIGN_IN", token: json.token, id: json._id });
            // setToken(true);
          });

        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        // console.log("data", data)
        // fetch('http://192.168.0.128:5000/auth/login', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     }, body: JSON.stringify({
        //         "phone": data.phone,
        //         "password": data.passWord
        //     })
        // })
        //     .then((res) => res.json())
        //     .then((json) => {
        //         console.log(json)
        //         if (json.accesstocken)
        //             return AsyncStorage.setItem("userToken", json.accesstocken)
        //         else
        //             throw err
        //     })
        //     .then(() => {
        //         console.log("ok")
        //         // navigation.goBack()
        //         dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' })
        //     })
        //     .catch((err) => console.log(`err ${err}`))
      },
      signOut: () => {
        console.log("sign out");
        localStorage.removeItem("userToken");
        localStorage.removeItem("userId");
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        console.log("sign out");
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        // dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },

      state,
    }),
    [state]
  );

  //End State

  const getLocalStorage = async () => {
    const tokenData = await localStorage.getItem("token");
    return tokenData ? true : false;
  };

  const menu = routes.map((route, index) => {
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
    <Aux>
      <ScrollToTop>
        <Suspense fallback={<Loader />}>
          {/* <AdminLayout/> */}
          <AuthContext.Provider value={authContext}>
            <Switch>
              {state.userToken ? <AdminLayout /> : <AuthScreen />}
            </Switch>
          </AuthContext.Provider>
          {/* <AuthScreen/> */}

          {/* <Switch>
      <Route path="/" component={AuthScreen} / >  
      <Redirect from="/"  to="/auth/signin" />
        
      </Switch> */}

          {/* <Switch>
          
          {menu}
          
          
          <Route path="/" component={AdminLayout} />

          </Switch> */}
        </Suspense>
      </ScrollToTop>
    </Aux>
  );
}

export default App;
