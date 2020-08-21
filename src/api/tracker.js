import axios from "axios";

//the baseURL here is the ethernet IPv4Address.
//type IPConfig in the terminal
export default axios.create({
  baseURL: "http://5b725bb6c740.ngrok.io",
});
