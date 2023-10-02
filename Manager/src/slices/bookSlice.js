import { createSlice } from "@reduxjs/toolkit";
const bookSlice = createSlice({
  name: "book",
  initialState: {
    showAddBook: false,
    showUpdateBook: false,
    showDeleteBook: false,
    updatedBook: null,
    books: {
      allBooks: null,
      isFetching: false,
      error: false,
    }
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
    },

    getBookBegin(state) {
      state.books.isFetching = true;
    },

    getBookSuccess(state, action) {
      state.books.allBooks = action.payload;
      state.books.isFetching = false;
    },

    getBookFailure(state) {
      state.books.error = true;
      state.books.isFetching = false;
    },
  },
});
const { actions, reducer } = bookSlice;
export const { setShowAddBook, setShowUpdateBook, setUpdatedBook, setShowDeleteBook, getBookBegin, getBookSuccess, getBookFailure } = actions;
export default reducer;