import axios from "axios";

export default axios.create({
  baseURL:
    process.env.REACT_APP_DEV === "1"
      ? process.env.REACT_APP_BASEURL_DEV
      : process.env.REACT_APP_BASEURL,
});
