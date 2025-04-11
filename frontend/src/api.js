import axios from "axios";

const API = axios.create({ baseURL: "https://student-job-tracker-backend.up.railway.app/api" });

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = user.token;
  }
  return req;
});

export default API;
