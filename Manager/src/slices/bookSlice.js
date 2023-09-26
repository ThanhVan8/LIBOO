import { createSlice } from "@reduxjs/toolkit";
const bookSlice = createSlice({
  name: "book",
  initialState: {
    showAddBook: false,
    showUpdateBook: false,
    showDeleteBook: false,
    updatedBook: null,
  },
  reducers: {
    setShowAddBook(state, action) {
      state.showAddBook = !state.showAddBook
    },
    setShowUpdateBook(state, action) {
      state.showUpdateBook = !state.showUpdateBook
    },
    setShowDeleteBook(state, action) {
      state.showDeleteBook = !state.showDeleteBook
    },
    setUpdatedBook(state, action) {
      state.updatedBook = action.payload
    }
  },
});
const { actions, reducer } = bookSlice;
export const { setShowAddBook, setShowUpdateBook, setUpdatedBook, setShowDeleteBook } = actions;
export default reducer;