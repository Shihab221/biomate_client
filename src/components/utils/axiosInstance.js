import axios from "axios";
// axios.defaults.baseURL="http://localhost:5000";
const instance = axios.create({
    // baseURL: "http://localhost:5000"
    baseURL:"https://biomate-server-49d3.vercel.app/"
  });
  
export default instance;