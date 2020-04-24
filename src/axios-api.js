import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

instance.defaults.headers.get["Accepts"] = "application/json";

export default instance;
