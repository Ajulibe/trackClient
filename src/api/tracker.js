import axios from "axios";
import { AsyncStorage } from "react-native";

//the baseURL here is the ethernet IPv4Address.
//type IPConfig in the terminal
const instance = axios.create({
  baseURL: "http://39167d6e7ae5.ngrok.io",
});

//a smarter and cleaner way to authenticate request
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
