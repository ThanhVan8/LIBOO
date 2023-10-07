import { combineReducers } from "redux";
import authSlice from "./authSlice";
import menuSlice from "./menuSlice";


const rootReducer = combineReducers({
    auth: authSlice,
    menu: menuSlice,
});

export default rootReducer;