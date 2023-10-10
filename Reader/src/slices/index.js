import { combineReducers } from "redux";
import authSlice from "./authSlice";
import menuSlice from "./menuSlice";
import bookSlice from "./bookSlice";


const rootReducer = combineReducers({
    menu: menuSlice,
    book: bookSlice,
    auth: authSlice,

});

export default rootReducer;