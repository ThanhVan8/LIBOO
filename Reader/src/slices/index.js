import { combineReducers } from "redux";
import authSlice from "./authSlice";
import menuSlice from "./menuSlice";
import bookSlice from "./bookSlice";
import slipSlice from "./slipSlice";


const rootReducer = combineReducers({
    menu: menuSlice,
    book: bookSlice,
    auth: authSlice,
    slip: slipSlice,
});

export default rootReducer;