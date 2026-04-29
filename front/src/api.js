import axios from "axios";
import {getCookie} from "./services/CookieService.js";
import { env } from "./env.js";

export const api = axios.create({
    baseURL: env.apiBaseUrl
});

api.interceptors.request.use(cfg => {
    const jwtToken = getCookie("jwt");
    if (jwtToken) {
        cfg.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return cfg;
});