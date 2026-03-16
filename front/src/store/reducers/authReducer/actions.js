import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { deleteCookie, setCookie } from "../../../services/CookieService";

export const login = (cred) => async (dispatch) => {
    try {
        const url = import.meta.env.VITE_API_URL + "auth/login";
        const response = await axios.post(url, cred);
        const { data } = response;
        await loginByToken(data.payload, cred.rememberMe)(dispatch);
        return data;
    } catch (error) {
        const { response } = error;
        const { data } = response;
        return data;
    }
};

export const loginByToken = (token, rememberMe) => async (dispatch) => {
    if (rememberMe) {
        const expires = jwtDecode(token).exp;
        setCookie("jwt", token, expires);
    } else {
        setCookie("jwt", token);
    }
    const userData = jwtDecode(token);
    dispatch({ type: "LOGIN", payload: userData });
};

export const register = (userData) => async (dispatch) => {
    try {
        const url = import.meta.env.VITE_API_URL + "auth/register";
        const response = await axios.post(url, userData);
        dispatch({ type: "REGISTER" });
        return response.data;
    } catch (error) {
        const { response } = error;
        const { data } = response;
        return data;
    }
};

export const logout = () => async (dispatch) => {
    try {
        deleteCookie("jwt");
        dispatch({ type: "LOGOUT" });
    } catch (error) {
        return error;
    }
};
