import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};


api.interceptors.response.use(
  (response) => {
    const newToken = response.headers["x-access-token"];
    if (newToken) {
      setAuthToken(newToken);
      localStorage.setItem("accessToken", newToken);
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      setAuthToken(null);
      localStorage.removeItem("accessToken");
    }
    return Promise.reject(error);
  }
);

export default api;
