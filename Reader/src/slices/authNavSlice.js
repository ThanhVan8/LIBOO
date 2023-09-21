import { createSlice } from "@reduxjs/toolkit";
const authNavSlice = createSlice({
  name: "authNav",
  initialState: "Sign In",
  reducers: {
    navigate(state, action) {
      return state = action.payload
    },
  },
});
const { actions, reducer } = authNavSlice;
export const { navigate } = actions;
export default reducer;