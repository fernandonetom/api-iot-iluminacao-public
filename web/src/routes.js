import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import UserHome from "./pages/UserPanel/UserHome";
import UserMqttDetails from "./pages/UserPanel/UserMqttDetails";
import UserMqttNew from "./pages/UserPanel/UserMqttNew";
import UserProfile from "./pages/UserPanel/UserProfile";
import OrgHome from "./pages/OrgPanel/OrgHome";
import UserReports from "./pages/UserPanel/UserReports";
import UserDevices from "./pages/UserPanel/UserDevices";
import ListUsers from "./pages/OrgPanel/ListUsers";
import CreateUser from "./pages/OrgPanel/CreateUser";
import OrgProfile from "./pages/OrgPanel/OrgProfile";
import { Context } from "./Context/AuthContext";
import GlobalLoading from "./components/GlobalLoading";
import { toast } from "react-toastify";
function CustomRoute({ isPrivate, privateType, isLogin, isAdmin, ...rest }) {
  const { authLoading, authenticated, userData } = useContext(Context);

  if (authLoading) {
    return <GlobalLoading />;
  }
  if (isPrivate && !authenticated) {
    toast.error("Não autorizado, faça login para acessar o sistema.", {
      toastId: "401",
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
  if (isPrivate && privateType && userData.loginType !== privateType) {
    toast.error(
      "Não autorizado, você não tem permissão para acessar a página solicitada.",
      {
        toastId: "401",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
    return <Redirect to="/login" />;
  }
  if (isAdmin && userData.userLevel !== "admin") {
    toast.error("Você não é administrador para acessar essa página.", {
      toastId: "401",
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
  if (isLogin && authenticated) {
    return <Redirect to={`/${userData.loginType}/dashboard`} />;
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute
        path="/users/dashboard"
        privateType="users"
        isPrivate
        component={UserHome}
      />
      <CustomRoute
        path="/users/profile"
        privateType="users"
        isPrivate
        component={UserProfile}
      />
      <CustomRoute
        path="/users/device-details/:id"
        isPrivate
        privateType="users"
        component={UserMqttDetails}
      />
      <CustomRoute
        path="/users/device-edit/:id"
        isPrivate
        privateType="users"
        isAdmin
        component={() => <UserMqttNew type="edit" />}
      />
      <CustomRoute
        path="/users/new-device"
        isPrivate
        isAdmin
        privateType="users"
        component={() => <UserMqttNew type="new" />}
      />
      <CustomRoute
        path="/users/devices"
        isPrivate
        isAdmin
        privateType="users"
        component={UserDevices}
      />
      <CustomRoute
        path="/users/reports"
        isPrivate
        isAdmin
        privateType="users"
        component={UserReports}
      />
      <CustomRoute
        path="/organizations/login"
        isLogin
        component={() => <Login loginType="organizations" />}
      />
      <CustomRoute
        path="/organizations/dashboard"
        isPrivate
        privateType="organizations"
        component={OrgHome}
      />
      <CustomRoute
        path="/organizations/users"
        isPrivate
        component={ListUsers}
        privateType="organizations"
      />
      <CustomRoute
        path="/organizations/profile"
        isPrivate
        privateType="organizations"
        component={OrgProfile}
      />
      <CustomRoute
        path="/organizations/new-user"
        privateType="organizations"
        isPrivate
        component={() => <CreateUser type="new" />}
      />
      <CustomRoute
        path="/organizations/edit-user/:id"
        privateType="organizations"
        isPrivate
        component={() => <CreateUser type="edit" />}
      />
      <CustomRoute
        path="*"
        isLogin
        component={() => <Login privateType="users" loginType="users" />}
      />
    </Switch>
  );
}
