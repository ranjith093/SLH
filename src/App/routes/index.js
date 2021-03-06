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
const DipAddAccount = React.lazy(() => import("../layout/Dip/addAccount"));
//Settings

const Settings = React.lazy(() => import("../layout/Settings"));

//NLp
const Nlp = React.lazy(() => import("../layout/Nlp"));

//Media Server

const MediaServer = React.lazy(() => import("../layout/MediaServer"));

//create user
const Customer = React.lazy(() => import("../layout/Customer"));
//Users
const Users = React.lazy(() => import("../layout/Users"));

//Form
const FormTest = React.lazy(() => import("../layout/Form"));
const FormTestAdd = React.lazy(() => import("../layout/Form/add"));

//Report

const Report = React.lazy(() => import("../layout/Report"));

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
  { path: "/did/phone/:id", exact: true, name: "Carrier", component: DipAdd },
  {
    path: "/did/account/:id",
    exact: true,
    name: "Carrier",
    component: DipAddAccount,
  },
  { path: "/settings", exact: true, name: "Settings", component: Settings },
  { path: "/nlp", exact: true, name: "Nlp", component: Nlp },
  {
    path: "/mediaServer",
    exact: true,
    name: "MediaServer",
    component: MediaServer,
  },
  {
    path: "/customers",
    exact: true,
    name: "Create user",
    component: Customer,
  },
  {
    path: "/users",
    exact: true,
    name: "Create user",
    component: Users,
  },
  { path: "/formtest", exact: true, name: "From", component: FormTest },
  { path: "/formtest/:id", exact: true, name: "From", component: FormTestAdd },
  { path: "/report", exact: true, name: "Report", component: Report },
];

export default routes;
