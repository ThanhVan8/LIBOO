import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        logout: {
            isFetching: false,
            error: false,
        }
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
        //logout
        logoutBegin: (state) => {
            state.logout.isFetching = true
        },
        
        logoutSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.currentUser = null
            state.login.error = false
        },

        logoutFailure: (state) => {
            state.logout.isFetching = false
            state.logout.error = true
        },
    }
})

export const {
    loginBegin,
    loginSuccess,
    loginFailure,
    
    logoutBegin,
    logoutSuccess,
    logoutFailure
} = authSlice.actions

export default authSlice.reducer