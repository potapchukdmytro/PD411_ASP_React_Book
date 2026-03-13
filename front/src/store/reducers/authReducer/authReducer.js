const initState = {
    user: null,
    isAuth: false,
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "REGISTER":
            return state;
        default:
            return state;
    }
};
