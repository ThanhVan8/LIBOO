import { createSlice } from "@reduxjs/toolkit";
const readerSlice = createSlice({
  name: "reader",
  initialState: {
    showAddReader: false,
    showUpdateReader: false,
    updatingReader: null,
    readers:{
      allUsers: null,
      isFetching: false,
      error: false,
    }
  },
  reducers: {
    setShowAddReader(state, action) {
      state.showAddReader = !state.showAddReader
    },
    setShowUpdateReader(state, action) {
      state.showUpdateReader = !state.showUpdateReader
    },
    setUpdatingReader(state, action) {
      state.updatingReader = action.payload
    },

    getUserBegin(state) {
      state.readers.isFetching = true;
    },

    getUserSuccess(state, action) {
      state.readers.allUsers = action.payload;
      state.readers.isFetching = false;
    },

    getUserFailure(state) {
      state.readers.error = true;
      state.readers.isFetching = false;
    }

  },
});
const { actions, reducer } = readerSlice;
export const { setShowAddReader, setShowUpdateReader, setUpdatingReader, getUserBegin, getUserSuccess, getUserFailure } = actions;
export default reducer;