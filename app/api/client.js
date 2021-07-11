import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.29.212:9107",
  timeout: 30000,
});

export default apiClient;
