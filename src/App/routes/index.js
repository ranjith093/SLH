import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

// const DashboardDefault = React.lazy(() => import("./Demo/Dashboard/Default"));
const DashboardDefault = React.lazy(() =>
  import("../../Demo/Dashboard/Default")
);

const Cpass = React.lazy(() => import("../layout/Cpass"));

const routes = [
  {
    path: "/dashboard/default",
    exact: true,
    name: "Default",
    component: DashboardDefault,
  },
  { path: "/cpass", exact: true, name: "Cpass", component: Cpass },
];

export default routes;
