import { combineReducers } from "redux";
import authSlice from "./authSlice";
import menuSlice from "./menuSlice";
import bookSlice from "./bookSlice";


const rootReducer = combineReducers({
    auth: authSlice,
    menu: menuSlice,
    book: bookSlice,
});

export default rootReducer;