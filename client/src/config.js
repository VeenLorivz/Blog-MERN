import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://lorivzblog.herokuapp.com/api/",
});
