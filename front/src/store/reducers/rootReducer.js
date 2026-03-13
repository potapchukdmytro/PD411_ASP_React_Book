import { combineReducers } from "@reduxjs/toolkit"
import { bookReducer } from "./bookReducer/bookReducer"
import { authorReducer } from "./authorReducer/authorReducer"
import { authReducer } from "./authReducer/authReducer"

export const rootReducer = combineReducers({
    // наші редюсери
    // name: reducer
    book: bookReducer,
    author: authorReducer,
    auth: authReducer
})