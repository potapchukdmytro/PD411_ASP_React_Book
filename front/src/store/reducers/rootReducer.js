import { combineReducers } from "@reduxjs/toolkit"
import { bookReducer } from "./bookReducer/bookReducer"
import { authReducer } from "./authReducer/authReducer"
import {authorApi} from "../services/AuthorApi.js";

export const rootReducer = combineReducers({
    // наші редюсери
    // name: reducer
    book: bookReducer,
    auth: authReducer,
    [authorApi.reducerPath]: authorApi.reducer
})