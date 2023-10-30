import { createSlice } from "@reduxjs/toolkit";
const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: {
      allBooks: null,
      isFetching: false,
      error: false,
    },
    book:{
      currentBook: null,
      isFetching: false,
      error: false,
    }
  },
  reducers: {
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

    getOneBookBegin(state) {
      state.book.isFetching = true;
    },

    getOneBookSuccess(state, action) {
      state.book.currentBook = action.payload;
      state.book.isFetching = false;
    },

    getOneBookFailure(state) {
      state.book.error = true;
      state.book.isFetching = false;
    },
  },
});
const { actions, reducer } = bookSlice;
export const {
  getBookBegin, getBookSuccess, getBookFailure, getOneBookBegin, getOneBookSuccess, getOneBookFailure
} = actions;
export default reducer;