import { combineReducers } from "redux";
import authSlice from "./authSlice";
import menuSlice from "./menuSlice";
import bookSlice from "./bookSlice";


const rootReducer = combineReducers({
    menu: menuSlice,
    auth: authSlice,
    book: bookSlice,
});

export default rootReducer;