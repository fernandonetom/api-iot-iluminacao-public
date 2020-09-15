import { useState, useEffect } from "react";
import api from "../../services/api";
import history from "../../history";
export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    const dataStorage = localStorage.getItem("@sipi-data");
    if (dataStorage) {
      try {
        const data = JSON.parse(dataStorage);
        api.defaults.headers.Authorization = `Bearer ${data.token}`;
        setUserData({
          token: data.token,
          loginType: data.loginType,
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
    console.log(data);
    localStorage.setItem("@sipi-data", JSON.stringify({ ...data, loginType }));
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
    setAuthenticated(true);
    setUserData(JSON.stringify(data));

    loginType === "users"
      ? history.replace("/user/dashboard")
      : history.replace("/organization/dashboard");
  }
  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("@sipi-data");
    api.defaults.headers.Authorization = undefined;
    history.push("/");
  }
  return { authenticated, userData, authLoading, handleLogin, handleLogout };
}
