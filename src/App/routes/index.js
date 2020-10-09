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
const CpassAdd = React.lazy(() => import("../layout/Cpass/add"));

const routes = [
  {
    path: "/dashboard/default",
    exact: true,
    name: "Default",
    component: DashboardDefault,
  },
  { path: "/cpass", exact: true, name: "Cpass", component: Cpass },
  { path: "/cpass/:id", exact: true, name: "Cpass", component: CpassAdd },
];

export default routes;
