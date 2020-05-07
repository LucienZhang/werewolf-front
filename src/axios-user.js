import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL + "/user",
});

instance.defaults.headers.get["Accepts"] = "application/json";

import store from "./store/index";

instance.interceptors.request.use((request) => {
  if (store.state.token) {
    request.headers["Authorization"] = `Bearer ${store.state.token}`;
  }
  return request;
});

if (process.env.VUE_APP_DEBUG === "true") {
  instance.interceptors.request.use((request) => {
    console.log("Starting Request", request);
    return request;
  });

  instance.interceptors.response.use((response) => {
    console.log("Response:", response);
    return response;
  });
}

export default instance;
