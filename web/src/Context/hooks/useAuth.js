import { useState, useEffect } from "react";
import api from "../../services/api";
import history from "../../history";
import { toast } from "react-toastify";
export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    api.interceptors.response.use(undefined, function (error) {
      if (401 === error.response.status) {
        handleLogout();
        toast.error("Token expirado, faça login novamente", {
          toastId: "401",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        return Promise.reject(error);
      }
    });
    const dataStorage = localStorage.getItem("@sipi-data");
    if (dataStorage) {
      try {
        const data = JSON.parse(dataStorage);
        api.defaults.headers.Authorization = `Bearer ${data.token}`;
        setUserData({
          token: data.token,
          name: data.name,
          loginType: data.loginType,
          userLevel: data.userLevel,
        });
        setAuthenticated(true);
      } catch (err) {
        setAuthenticated(false);
      }
    }
    setAuthLoading(false);
  }, []);

  async function handleLogin({ loginType, email, password, remember }) {
    setAuthLoading(true);
    const { data } = await api.post(`${loginType}/signin`, {
      email,
      password,
      remember,
    });
    if (data.error) {
      setAuthLoading(false);
      return data;
    }
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
    const { data: profile } = await api.get(`${loginType}/profile`);

    const signinData = {
      ...data,
      name: profile.name,
      loginType,
    };
    localStorage.setItem("@sipi-data", JSON.stringify(signinData));
    setAuthenticated(true);
    setUserData(signinData);
    setAuthLoading(false);
    history.replace(`/${loginType}/dashboard`);
  }
  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("@sipi-data");
    setUserData({});
    api.defaults.headers.Authorization = undefined;
    history.push("/");
  }
  function redirectIfLogged() {
    if (authenticated && userData.token) {
      return history.replace(`/${userData.loginType}/dashboard`);
    }
    return null;
  }
  return {
    authenticated,
    userData,
    authLoading,
    handleLogin,
    handleLogout,
    redirectIfLogged,
  };
}
