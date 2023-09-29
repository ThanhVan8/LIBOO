import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'Auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
    },
    reducers: {
        //login
        loginBegin: (state) => {
            state.login.isFetching = true
        },
        
        loginSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.currentUser = action.payload
            state.login.error = false
        },

        loginFailure: (state) => {
            state.login.isFetching = false
            state.login.error = true
        },
    }
})

export const {
    loginBegin,
    loginSuccess,
    loginFailure,

} = authSlice.actions

export default authSlice.reducer 