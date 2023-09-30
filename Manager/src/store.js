import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './slices/index'
import authReducer from './slices/authSlice'
import readerReducer from './slices/readerSlice'

const store = configureStore({
  reducer: rootReducer,
  auth: authReducer,
  reader: readerReducer
})

export default store
