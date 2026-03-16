const initState = {
    user: null,
    isAuth: false,
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "REGISTER":
            return state;
        case "LOGIN":
            return { ...state, user: action.payload, isAuth: true };
        case "LOGOUT":
            return { ...state, user: null, isAuth: false };
        default:
            return state;
    }
};
