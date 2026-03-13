import { useDispatch } from "react-redux"
import { bindActionCreators } from "@reduxjs/toolkit"
import { actions } from "../reducers/actionsCreator"

export const useAction = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
}