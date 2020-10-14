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
//added cloud component
const Cloud = React.lazy(() => import("../layout/Cloud"));

//Server
const ServerComp = React.lazy(() => import("../layout/Server"));
const ServerAdd = React.lazy(() => import("../layout/Server/add"));
//Dip
const Dip = React.lazy(() => import("../layout/Dip"));
const DipAdd = React.lazy(() => import("../layout/Dip/add"));
//Settings

const Settings = React.lazy(() => import("../layout/Settings"));

const routes = [
  {
    path: "/dashboard/default",
    exact: true,
    name: "Default",
    component: DashboardDefault,
  },
  { path: "/cpass", exact: true, name: "Cpass", component: Cpass },
  { path: "/cpass/:id", exact: true, name: "Cpass", component: CpassAdd },
  { path: "/cloud", exact: true, name: "Cloud", component: Cloud },
  { path: "/server", exact: true, name: "Server", component: ServerComp },
  { path: "/server/:id", exact: true, name: "Server", component: ServerAdd },
  { path: "/dip", exact: true, name: "Carrier", component: Dip },
  { path: "/dip/:id", exact: true, name: "Carrier", component: DipAdd },
  { path: "/settings", exact: true, name: "Settings", component: Settings },
];

export default routes;
