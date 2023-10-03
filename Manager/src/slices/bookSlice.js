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
    },
    updateBook: {
      isFetching: false,
      error: false,
      success: false
    },
    deleteBook: {
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
    }, 

    updateBookBegin: (state) => {
      state.updateBook.isFetching = true
    },
    
    updateBookSuccess: (state) => {
        state.updateBook.isFetching = false
        state.updateBook.success = true
        state.updateBook.error = false
    },

    updateBookFailure: (state) => {
        state.updateBook.isFetching = false
        state.updateBook.error = true
        state.updateBook.success = false
    },

    deleteBookBegin: (state) => {
      state.deleteBook.isFetching = true
    },
    
    deleteBookSuccess: (state) => {
        state.deleteBook.isFetching = false
        state.deleteBook.success = true
        state.deleteBook.error = false
    },

    deleteBookFailure: (state) => {
        state.deleteBook.isFetching = false
        state.deleteBook.error = true
        state.deleteBook.success = false
    }
  },
});
const { actions, reducer } = bookSlice;
export const { 
  setShowAddBook, setShowUpdateBook, setUpdatedBook, setShowDeleteBook, getBookBegin, getBookSuccess, getBookFailure,
  addBookBegin, addBookSuccess, addBookFailure, updateBookBegin, updateBookSuccess, updateBookFailure, deleteBookBegin,
  deleteBookSuccess, deleteBookFailure
} = actions;
export default reducer;