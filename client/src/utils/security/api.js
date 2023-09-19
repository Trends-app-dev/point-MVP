import axios from "axios";

const api = axios.create({
  baseURL: "https://point-mvp-j2g6-dev.fl0.io/",
  withCredentials: "include",
});

export default api;
