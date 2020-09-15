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
      <Route path="/user/reports">
        <UserReports />
      </Route>
      <Route path="/organization/login">
        <Login loginType="organizations" />
      </Route>
      <Route path="/organization/dashboard">
        <OrgHome />
      </Route>
      <Route path="/organization/users">
        <ListUsers />
      </Route>
      <Route path="/organization/new-user">
        <CreateUser type="new" />
      </Route>
      <Route path="/organization/profile">
        <OrgProfile />
      </Route>
      <Route path="*">
        <Login loginType="users" />
      </Route>
    </Switch>
  );
}
