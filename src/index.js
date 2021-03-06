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
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "./styles.css";
import AdminLayout from "layouts/Admin.js";
import { Provider } from "react-redux";
import Login from "views/Login";
import { Finish, Unfinish, Failed } from "views";
import store from "./store";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route
          path="/admin"
          render={(props) => {
            // return <Redirect to="/login" />; // protected guard
            // return <AdminLayout {...props} />;
            if (localStorage.getItem("access_token"))
              return <AdminLayout {...props} />;
            return <Redirect to="/login" />;
          }}
        />
        <Route path="/finish" exact component={Finish} />
        <Route path="/unfinish" exact component={Unfinish} />
        <Route path="/failed" exact component={Failed} />
        <Route
          path="/login"
          exact
          render={(props) => {
            // return <Redirect to="/login" />; // protected guard
            // return <AdminLayout {...props} />;
            if (localStorage.getItem("access_token"))
              return <Redirect to="/admin/dashboard" />;
            return <Login {...props} />;
          }}
        />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
