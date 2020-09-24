import axios from "axios";
const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_BASEURL_DEV
      : process.env.REACT_APP_BASEURL,
});

export default api;
