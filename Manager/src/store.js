import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './slices/index'
import authReducer from './slices/authSlice'
import readerReducer from './slices/readerSlice'
import bookReducer from './slices/bookSlice'

const store = configureStore({
  reducer: rootReducer,
  auth: authReducer,
  reader: readerReducer,
  book: bookReducer
})

export default store
