import axios from "axios";

export const login = () => async (dispatch) => {};

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
