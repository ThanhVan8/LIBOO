import { createSlice } from "@reduxjs/toolkit";
const slipSlice = createSlice({
  name: "slip",
  initialState: {
    slips:{
      allSlips: null,
      isFetching: false,
      error: false
    },
    newSlip: {
      isFetching: false,
      error: false,
      success: false
    },
    returnSlip:{
      isFetching: false,
      error: false,
      success: false
    }
  },
  reducers: {
    getSlipsBegin(state) {
      state.slips.isFetching = true;
    },

    getSlipsSuccess(state, action) {
      state.slips.allSlips = action.payload;
      state.slips.isFetching = false;
    },

    getSlipsFailure(state) {
      state.slips.error = true;
      state.slips.isFetching = false;
    },

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

    returnBookBegin: (state) => {
      state.returnSlip.isFetching = true
    },
    
    returnBookSuccess: (state) => {
        state.returnSlip.isFetching = false
        state.returnSlip.success = true
        state.returnSlip.error = false
    },

    returnBookFailure: (state) => {
        state.returnSlip.isFetching = false
        state.returnSlip.error = true
        state.returnSlip.success = false
    }, 
  },
});
const { actions, reducer } = slipSlice;
export const { 
  getSlipsBegin, getSlipsSuccess, getSlipsFailure, addSlipBegin, addSlipSuccess, addSlipFailure,
  returnBookBegin, returnBookSuccess, returnBookFailure
} = actions;
export default reducer;