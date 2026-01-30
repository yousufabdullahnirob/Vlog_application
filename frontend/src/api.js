import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getPosts = () => API.get("posts/");
export const getPost = (id) => API.get(`posts/${id}/`);
export const createPost = (data) => API.post("posts/", data);
export const updatePost = (id, data) => API.put(`posts/${id}/`, data);
export const deletePost = (id) => API.delete(`posts/${id}/`);
export const register = (data) => API.post("user/register/", data);

export default API;
