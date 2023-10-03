import { combineReducers } from "redux";
import menuSlice from "./menuSlice";
import readerSlice from "./readerSlice";
import bookSlice from "./bookSlice";
import authSlice from "./authSlice";
import slipSlice from "./slipSlice";

const rootReducer = combineReducers({
    menu: menuSlice,
    auth: authSlice,
    reader: readerSlice,
    book: bookSlice,
    slip: slipSlice
});

export default rootReducer;