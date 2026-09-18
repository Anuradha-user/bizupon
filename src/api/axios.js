import axios from "axios";
import { baseURL } from "./apiLayout.js";

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add a request interceptor to include the access token in the headers
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;