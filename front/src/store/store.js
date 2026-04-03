import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/rootReducer";
import {authorApi} from "./services/AuthorApi.js";
import {bookApi} from "./services/BookApi.js";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authorApi.middleware)
            .concat(bookApi.middleware)
})