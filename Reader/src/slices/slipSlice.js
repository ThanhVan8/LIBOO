import { createSlice } from "@reduxjs/toolkit";
const slipSlice = createSlice({
  name: "slip",
  initialState: {
    newSlip: {
      isFetching: false,
      error: false,
      success: false
    },
  },
  reducers: {
    addSlipBegin: (state) => {
      state.newSlip.isFetching = true
    },
    
    addSlipSuccess: (state) => {
        state.newSlip.isFetching = false
        state.newSlip.success = true
        state.newSlip.error = false
    },

    addSlipFailure: (state) => {
        state.newSlip.isFetching = false
        state.newSlip.error = true
        state.newSlip.success = false
    }, 
  },
});
const { actions, reducer } = slipSlice;
export const { 
    addSlipBegin, addSlipSuccess, addSlipFailure
} = actions;
export default reducer;