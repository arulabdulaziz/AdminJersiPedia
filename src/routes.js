/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import {
  ListLiga,
  LigaAdd,
  LigaEdit,
  JerseyAdd,
  JerseyEdit,
  ListJersey,
} from "./views";
// import Notifications from "views/Notifications.js";
// import Typography from "views/Typography.js";
// import TableList from "views/Tables.js";
// import Maps from "views/Map.js";
// import UserPage from "views/User.js";
// import UpgradeToPro from "views/Upgrade.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    title: "Dashboard",
    sidebar: true,
  },
  {
    path: "/liga",
    name: "Liga",
    icon: "nc-icon nc-world-2",
    component: ListLiga,
    layout: "/admin",
    title: "Liga",
    sidebar: true,
  },
  {
    path: "/liga-add",
    name: "LigaAdd",
    icon: "nc-icon nc-world-2",
    component: LigaAdd,
    layout: "/admin",
    sidebar: false,
    title: "Tambah Liga",
  },
  {
    path: "/liga-edit/:id",
    name: "LigaEdit",
    icon: "nc-icon nc-world-2",
    component: LigaEdit,
    layout: "/admin",
    sidebar: false,
    title: "Edit Liga",
  },
  {
    path: "/jersey",
    name: "Jersey",
    icon: "nc-icon nc-cart-simple",
    component: ListJersey,
    layout: "/admin",
    title: "Jersey",
    sidebar: true,
  },
  {
    path: "/jersey-add",
    name: "JerseyAdd",
    icon: "nc-icon nc-world-2",
    component: JerseyAdd,
    layout: "/admin",
    sidebar: false,
    title: "Tambah Jersey",
  },
  {
    path: "/jersey-edit/:id",
    name: "JerseyEdit",
    icon: "nc-icon nc-world-2",
    component: JerseyEdit,
    layout: "/admin",
    sidebar: false,
    title: "Edit Jersey",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
    title: "Icons",
    sidebar: true,
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: UserPage,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: UpgradeToPro,
  //   layout: "/admin",
  // },
];
export default routes;
