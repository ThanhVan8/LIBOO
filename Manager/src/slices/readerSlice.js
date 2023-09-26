import { createSlice } from "@reduxjs/toolkit";
const readerSlice = createSlice({
  name: "reader",
  initialState: {
    showAddReader: false,
    showUpdateReader: false,
    updatingReader: null,
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
    setUpdatingReader(state, action) {
      state.updatingReader = action.payload
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
export const { setShowAddReader, setShowUpdateReader, setUpdatingReader, getUserBegin, getUserSuccess, getUserFailure } = actions;
export default reducer;