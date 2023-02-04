import axios from "axios";

const baseURL = "https://jsonplaceholder.typicode.com";

const API = axios.create({
  baseURL,
});

export const getPosts = () =>
  API.get("/posts", { params: { userId: 1 } }).then(({ data }) => data);
export const getPostById = (id) =>
  API.get(`/posts/${id}`).then(({ data }) => data);
