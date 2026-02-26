import axios from "axios";

// Railway backend base URL
const BASE_URL = "https://task-manager-production-a47c.up.railway.app";

const API = `${BASE_URL}/api/users`;

export const registerUser = (data) => axios.post(`${API}/register`, data);
export const loginUser = (data) => axios.post(`${API}/login`, data);