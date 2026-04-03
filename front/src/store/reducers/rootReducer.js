import { combineReducers } from "@reduxjs/toolkit"
import { bookReducer } from "./bookReducer/bookReducer"
import { authReducer } from "./authReducer/authReducer"
import {authorApi} from "../services/AuthorApi.js";
import {bookApi} from "../services/BookApi.js";

export const rootReducer = combineReducers({
    // наші редюсери
    // name: reducer
    book: bookReducer,
    auth: authReducer,
    [authorApi.reducerPath]: authorApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer
})