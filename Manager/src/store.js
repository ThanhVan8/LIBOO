import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './slices/index'
import authReducer from './slices/authSlice'

const store = configureStore({
  reducer: rootReducer,
  auth: authReducer
})



export default store
