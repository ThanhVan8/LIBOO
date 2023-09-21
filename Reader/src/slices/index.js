import { combineReducers } from "redux";
import authNavSlice from "./authNavSlice";

const rootReducer = combineReducers({
    authNav: authNavSlice,
});

export default rootReducer;