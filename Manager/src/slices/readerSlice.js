import { createSlice } from "@reduxjs/toolkit";
const readerSlice = createSlice({
  name: "reader",
  initialState: {
    showAddReader: false,
    showUpdateReader: false,
    readers:{
      allUsers: null,
      isFetching: false,
      error: false,
    },
    newReader:{
      isFetching: false,
      error: false,
      success: false
    },
    showDeleteReader: false,
    updatedReader: null,
    },

  reducers: {
    setShowAddReader(state, action) {
      state.showAddReader = !state.showAddReader
    },
    setShowUpdateReader(state, action) {
      state.showUpdateReader = !state.showUpdateReader
    },
    setShowDeleteReader(state, action) {
      state.showDeleteReader = !state.showDeleteReader
    },
    setUpdatedReader(state, action) {
      state.updatedReader = action.payload
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
    },

    addReaderBegin: (state) => {
      state.newReader.isFetching = true
    },
    
    addReaderSuccess: (state) => {
        state.newReader.isFetching = false
        state.newReader.success = true
        state.newReader.error = false
    },

    addReaderFailure: (state) => {
        state.newReader.isFetching = false
        state.newReader.error = true
        state.newReader.success = false
    }
  },
});
const { actions, reducer } = readerSlice;
export const { setShowAddReader, setShowUpdateReader, setUpdatedReader, setShowDeleteReader, getUserBegin, getUserSuccess, getUserFailure, 
  addReaderBegin, addReaderSuccess, addReaderFailure
} = actions;
export default reducer;