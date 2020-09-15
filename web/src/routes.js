import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import UserHome from "./pages/UserPanel/UserHome";
import UserMqttDetails from "./pages/UserPanel/UserMqttDetails";
import UserMqttNew from "./pages/UserPanel/UserMqttNew";
import UserProfile from "./pages/UserPanel/UserProfile";
import OrgHome from "./pages/OrgPanel/OrgHome";
import UserReports from "./pages/UserPanel/UserReports";
import ListUsers from "./pages/OrgPanel/ListUsers";
import CreateUser from "./pages/OrgPanel/CreateUser";
import OrgProfile from "./pages/OrgPanel/OrgProfile";
export default function Routes() {
  return (
    <Switch>
      <Route path="/users/dashboard">
        <UserHome />
      </Route>
      <Route path="/users/profile">
        <UserProfile />
      </Route>
      <Route path="/users/device-details">
        <UserMqttDetails />
      </Route>
      <Route path="/users/device-edit">
        <UserMqttNew type="edit" />
      </Route>
      <Route path="/users/new-device">
        <UserMqttNew type="new" />
      </Route>
      <Route path="/users/reports">
        <UserReports />
      </Route>
      <Route path="/organizations/login">
        <Login loginType="organizations" />
      </Route>
      <Route path="/organizations/dashboard">
        <OrgHome />
      </Route>
      <Route path="/organizations/users">
        <ListUsers />
      </Route>
      <Route path="/organizations/new-user">
        <CreateUser type="new" />
      </Route>
      <Route path="/organizations/profile">
        <OrgProfile />
      </Route>
      <Route path="*">
        <Login loginType="users" />
      </Route>
    </Switch>
  );
}
