import { createSlice } from "@reduxjs/toolkit";
const readerSlice = createSlice({
  name: "reader",
  initialState: {
    showAddReader: false,
    showUpdateReader: false,
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
    }
  },
});
const { actions, reducer } = readerSlice;
export const { setShowAddReader, setShowUpdateReader, setUpdatedReader, setShowDeleteReader } = actions;
export default reducer;