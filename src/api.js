// client/src/api.js
import axios from 'axios';

const API_BASE = 'https://job-tracker-2-5fbj.onrender.com';

export const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // optional, if you're using cookies
});