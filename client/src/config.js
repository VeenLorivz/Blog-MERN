import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://lorivzmernblog.herokuapp.com/api/",
});
