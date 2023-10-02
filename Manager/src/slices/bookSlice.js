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
    },
    newbook:{
      isFetching: false,
      error: false,
      success: false
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

    addBookBegin: (state) => {
      state.newbook.isFetching = true
    },
    
    addBookSuccess: (state) => {
        state.newbook.isFetching = false
        state.newbook.success = true
        state.newbook.error = false
    },

    addBookFailure: (state) => {
        state.newbook.isFetching = false
        state.newbook.error = true
        state.newbook.success = false
    }
  },
});
const { actions, reducer } = bookSlice;
export const { 
  setShowAddBook, setShowUpdateBook, setUpdatedBook, setShowDeleteBook, getBookBegin, getBookSuccess, getBookFailure,
  addBookBegin, addBookSuccess, addBookFailure
} = actions;
export default reducer;