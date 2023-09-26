import { combineReducers } from "redux";
import menuSlice from "./menuSlice";
import readerSlice from "./readerSlice";
import bookSlice from "./bookSlice";

const rootReducer = combineReducers({
    menu: menuSlice,
    reader: readerSlice,
    book: bookSlice,
});

export default rootReducer;