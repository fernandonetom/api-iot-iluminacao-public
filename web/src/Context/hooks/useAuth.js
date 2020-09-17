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
          loginType: data.loginType,
          userLevel: data.userLevel,
        });
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
    setAuthLoading(false);
    if (data.error) {
      return data;
    }
    localStorage.setItem("@sipi-data", JSON.stringify({ ...data, loginType }));
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
    setAuthenticated(true);
    setUserData(JSON.stringify(data));

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
    return userData.token
      ? history.replace(`/${userData.loginType}/dashboard`)
      : null;
  }
  function responseObserver(response) {
    console.log(response);
  }
  return {
    authenticated,
    userData,
    authLoading,
    handleLogin,
    handleLogout,
    redirectIfLogged,
    responseObserver,
  };
}
