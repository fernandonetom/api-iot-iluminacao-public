import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import UserHome from "./pages/UserPanel/UserHome";
import UserMqttDetails from "./pages/UserPanel/UserMqttDetails";
import UserMqttNew from "./pages/UserPanel/UserMqttNew";
import UserProfile from "./pages/UserPanel/UserProfile";
import OrgHome from "./pages/OrgPanel/OrgHome";
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <h1>inicio</h1>
          <Link to="sobre">Ir para sobre</Link>
        </Route>
        <Route path="/login">
          <Login loginType="user" />
        </Route>
        <Route path="/user/dashboard">
          <UserHome />
        </Route>
        <Route path="/user/profile">
          <UserProfile />
        </Route>
        <Route path="/user/device-details">
          <UserMqttDetails />
        </Route>
        <Route path="/user/device-edit">
          <UserMqttNew type="edit" />
        </Route>
        <Route path="/user/new-device">
          <UserMqttNew type="new" />
        </Route>
        <Route path="/organization/login">
          <Login loginType="organization" />
        </Route>
        <Route path="/organization/dashboard">
          <OrgHome />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
