import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-production-a47c.up.railway.app"
});

export default API;