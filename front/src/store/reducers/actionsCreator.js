import * as bookActions from "./bookReducer/actions";
import * as authActions from "./authReducer/actions";
import * as authorActions from "./authorReducer/actions";

export const actions = {
    ...bookActions,
    ...authActions,
    ...authorActions
}