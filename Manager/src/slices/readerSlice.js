import { createSlice } from "@reduxjs/toolkit";
const readerSlice = createSlice({
  name: "reader",
  initialState: {
    showAddReader: false,
    showUpdateReader: false,
    showDeleteReader: false,
    updatedReader: null,
    users: {
      allUsers: null,
      isFetching: false,
      error: false
    }
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
      state.users.isFetching = true;
    },

    getUserSuccess(state, action) {
      state.users.allUsers = action.payload;
      state.users.isFetching = false;
    },

    getUserFailure(state) {
      state.users.error = true;
      state.users.isFetching = false;
    }

  },
});
const { actions, reducer } = readerSlice;
export const { setShowAddReader, setShowUpdateReader, setUpdatedReader, setShowDeleteReader, getUserBegin, getUserSuccess, getUserFailure } = actions;
export default reducer;