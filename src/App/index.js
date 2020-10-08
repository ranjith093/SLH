import React, {
  Component,
  createContext,
  Suspense,
  useEffect,
  useState,
} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loadable from "react-loadable";

import "../../node_modules/font-awesome/scss/font-awesome.scss";

import Loader from "./layout/Loader";
import Aux from "../hoc/_Aux";
import ScrollToTop from "./layout/ScrollToTop";
import routes from "../route";

import AuthScreen from "./layout/Auth";

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader,
});

// class App extends Component {
//   render() {
//     const menu = routes.map((route, index) => {
//       return route.component ? (
//         <Route
//           key={index}
//           path={route.path}
//           exact={route.exact}
//           name={route.name}
//           render={(props) => <route.component {...props} />}
//         />
//       ) : null;
//     });

//     return (
//       <Aux>
//         <ScrollToTop>
//           <Suspense fallback={<Loader />}>
//             <Switch>
//               {menu}
//               <Route path="/" component={AdminLayout} />
//             </Switch>
//           </Suspense>
//         </ScrollToTop>
//       </Aux>
//     );
//   }
// }
const ProtectedRoute = ({ component: Component, token, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log("tokenw", token);
        if (!token) {
          return (
            <Redirect
              to={{
                pathname: "/auth/signin",
              }}
            />
          );
        }
        return <Component {...rest} {...props} />;
      }}
    />
  );
};

export const AuthContext = createContext();

function App() {
  const [token, setToken] = useState(false);

  const getLocalStorage = async () => {
    const tokenData = await localStorage.getItem("token");
    return tokenData ? true : false;
  };

  useEffect(() => {
    // setToken(localStorage.getItem('token'))
    const tokenData = localStorage.getItem("token");
    // console.log("get local ", getLocalStorage());

    if (tokenData) {
      // console.log("if");
      // return <Redirect  to="/" />
      setToken(true);
      // window.location.reload(false);
    }
  }, []);

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

  console.log("token data", token);

  return (
    <Aux>
      <ScrollToTop>
        <Suspense fallback={<Loader />}>
          <Switch>
            {/* <AdminLayout/> */}
            <AuthContext.Provider value={token}>
              {token ? <AdminLayout /> : <AuthScreen setToken={setToken} />}
            </AuthContext.Provider>
            {/* <AuthScreen/> */}
          </Switch>
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
