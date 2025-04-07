import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;
const instance = axios.create({
  baseURL: `https://vitalx-backend.onrender.com/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
