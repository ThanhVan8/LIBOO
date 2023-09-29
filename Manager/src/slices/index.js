import { combineReducers } from "redux";
import menuSlice from "./menuSlice";
import readerSlice from "./readerSlice";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
    menu: menuSlice,
    auth: authSlice,
    reader: readerSlice,
});

export default rootReducer;