import { combineReducers } from "redux";
import menuSlice from "./menuSlice";
import readerSlice from "./readerSlice";

const rootReducer = combineReducers({
    menu: menuSlice,
    reader: readerSlice,
});

export default rootReducer;