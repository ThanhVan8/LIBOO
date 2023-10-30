import { createSlice } from "@reduxjs/toolkit";
const menuSlice = createSlice({
  name: "menu",
  initialState: {
    toggle: false,
  },
  reducers: {
    setToggle(state, action) {
      state.toggle = !state.toggle
    },
  },
});
const { actions, reducer } = menuSlice;
export const { setToggle } = actions;
export default reducer;