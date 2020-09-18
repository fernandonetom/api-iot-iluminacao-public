import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

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
import { Context } from "./Context/AuthContext";
import GlobalLoading from "./components/GlobalLoading";
import { toast } from "react-toastify";
function CustomRoute({ isPrivate, ...rest }) {
  const { authLoading, authenticated } = useContext(Context);

  if (authLoading) {
    return <GlobalLoading />;
  }
  if (isPrivate && !authenticated) {
    toast.error("Não autorizado, faça login para acessar o sistema", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return <Redirect to="/login" />;
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute path="/users/dashboard" isPrivate component={UserHome} />
      <CustomRoute path="/users/profile" isPrivate component={UserProfile} />
      <CustomRoute
        path="/users/device-details/:id"
        isPrivate
        component={UserMqttDetails}
      />
      <CustomRoute
        path="/users/device-edit/:id"
        isPrivate
        component={() => <UserMqttNew type="edit" />}
      />
      <CustomRoute
        path="/users/new-device"
        isPrivate
        component={() => <UserMqttNew type="new" />}
      />
      <CustomRoute path="/users/reports" isPrivate component={UserReports} />
      <CustomRoute
        path="/organizations/login"
        component={() => <Login loginType="organizations" />}
      />
      <CustomRoute
        path="/organizations/dashboard"
        isPrivate
        component={OrgHome}
      />
      <CustomRoute
        path="/organizations/users"
        isPrivate
        component={ListUsers}
      />
      <CustomRoute
        path="/organizations/profile"
        isPrivate
        component={OrgProfile}
      />
      <CustomRoute
        path="/organizations/new-user"
        component={() => <CreateUser type="new" />}
      />
      <CustomRoute
        path="/organizations/edit-user/:id"
        component={() => <CreateUser type="edit" />}
      />
      <CustomRoute path="*" component={() => <Login loginType="users" />} />
    </Switch>
  );
}
