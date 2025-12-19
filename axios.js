import axios from "axios";

const api= axios.create({
  baseURL: "http://backend-express-two-fawn.vercel.app",
});

// ----- Add Token Automatically -----
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;