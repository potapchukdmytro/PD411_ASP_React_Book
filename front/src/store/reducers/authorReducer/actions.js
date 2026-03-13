import axios from "axios";

export const loadAuthors = () => async (dispatch) => {
    const authorsUrl = import.meta.env.VITE_AUTHORS_URL;
    // const pageCount = 150;
    // const page = 1;
    // const url = `${authorsUrl}?page_size=${pageCount}&page=${page}`;

    try {
        const response = await axios.get(authorsUrl);
        if (response.status === 200) {
            const { data } = response;
            dispatch({ type: "loadAuthors", payload: data.payload });
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};
