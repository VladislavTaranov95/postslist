import axios from "axios";
import authHeader from "@/services/auth.service";

const service = axios.create({
  baseURL: "http://51.158.179.21/api/v1/",
  headers: {
    "Content-Type": "application/json"
  }
});

service.interceptors.request.use(
  config => {
    const AUTH_TOKEN = authHeader();
    if (AUTH_TOKEN) {
      config.headers.Authorization = AUTH_TOKEN;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
