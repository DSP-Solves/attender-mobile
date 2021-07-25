import { create } from "apisauce";

const apiClient = create({
  // baseURL: "http://192.168.29.212:9107", // dev
  baseURL: "http://ec2.dspsolves.in", // prod
  timeout: 30000,
});

export default apiClient;
