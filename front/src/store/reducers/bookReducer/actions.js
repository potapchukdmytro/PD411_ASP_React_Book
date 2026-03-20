import axios from "axios";
import {api} from "../../../api.js";

export const loadBooks = () => async (dispatch) => {
    try {
        const response = await api.get("book");
        if(response.status === 200) {
            const {data} = response;
            dispatch({ type: "loadBooks", payload: data.payload });
        }
    } catch (error) {
        throw error;
    }
};

export const createBook = (newBook) => async (dispatch) => {
    const booksUrl = import.meta.env.VITE_BOOKS_URL;
    try {
        const response = await axios.post(booksUrl, newBook);
        if (response.status === 200) {
            dispatch({ type: "createBook", payload: newBook });
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

export const updateBook = (newBook) => async (dispatch) => {
    try {
        delete newBook.author;
        const booksUrl = import.meta.env.VITE_BOOKS_URL;
        let response = await axios.put(booksUrl, newBook);
        if (response.status === 200) {
            response = await axios.get(booksUrl);
            const {data} = response;
            dispatch({ type: "updateBook", payload: data.data.items });
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

export const deleteBook = (id) => async (dispatch) => {
    const booksUrl = import.meta.env.VITE_BOOKS_URL;
        try {
            await axios.delete(`${booksUrl}/${id}`);
            dispatch({ type: "deleteBook", payload: id });
            return true;
        } catch (error) {
            return false;
        }
};
