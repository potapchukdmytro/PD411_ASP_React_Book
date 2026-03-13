const initState = {
    books: [],
    isLoaded: false,
};

export const bookReducer = (state = initState, action) => {
    switch (action.type) {
        case "loadBooks":
            return { ...state, isLoaded: true, books: action.payload };
        case "deleteBook":
            return {
                ...state,
                books: state.books.filter((b) => b.id != action.payload),
            };
        case "updateBook":
            return {
                ...state,
                books: action.payload,
            };
        case "createBook":
            return {
                ...state,
                books: [...state.books, action.payload],
            };
        default:
            return state;
    }
};
