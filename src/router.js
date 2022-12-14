import React from "react";
import AdminLayout from "layouts/Admin.js";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "views/Login";

function Router() {
  return (
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
    </Switch>
  );
}

export default Router;
