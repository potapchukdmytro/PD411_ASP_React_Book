import axios from "axios";
import {getCookie} from "./services/CookieService.js";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(cfg => {
    const jwtToken = getCookie("jwt");
    if (jwtToken) {
        cfg.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return cfg;
});