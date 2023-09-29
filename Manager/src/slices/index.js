import { combineReducers } from "redux";
import menuSlice from "./menuSlice";
import readerSlice from "./readerSlice";
import bookSlice from "./bookSlice";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
    menu: menuSlice,
    auth: authSlice,
    reader: readerSlice,
    book: bookSlice,
});

export default rootReducer;