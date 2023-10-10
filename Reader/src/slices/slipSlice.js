import { createSlice } from "@reduxjs/toolkit";
const slipSlice = createSlice({
  name: "slip",
  initialState: {
    newSlip: {
      isFetching: false,
      error: false,
      success: false
    },
    slips: {
      allSlips: null,
      isFetching: false,
      error: false,
    }
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

    getSlipBegin(state) {
      state.slips.isFetching = true;
    },

    getSlipSuccess(state, action) {
      state.slips.allSlips = action.payload;
      state.slips.isFetching = false;
    },

    getSlipFailure(state) {
      state.slips.error = true;
      state.slips.isFetching = false;
    },
  },
});
const { actions, reducer } = slipSlice;
export const { 
    addSlipBegin, addSlipSuccess, addSlipFailure, getSlipBegin, getSlipSuccess, getSlipFailure
} = actions;
export default reducer;