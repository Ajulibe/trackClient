import axios from "axios";

//the baseURL here is the ethernet IPv4Address.
//type IPConfig in the terminal
export default axios.create({
  baseURL: "http://d4d774275729.ngrok.io",
});
