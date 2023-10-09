import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentAction: 'Sign In',
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },

        register: {
            isFetching: false,
            error: false,
            success: false
        }
    },
    reducers: {
        setCurrentAction: (state, action) => {
            state.currentAction = action.payload
        },
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

        //register
        registerBegin: (state) => {
            state.register.isFetching = true
        },
        
        registerSuccess: (state) => {
            state.register.isFetching = false
            state.register.success = true
            state.register.error = false
        },

        registerFailure: (state) => {
            state.register.isFetching = false
            state.register.error = true
            state.register.success = false
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
    setCurrentAction,

    loginBegin,
    loginSuccess,
    loginFailure,

    registerBegin,
    registerSuccess,
    registerFailure,

    logoutBegin,
    logoutSuccess,
    logoutFailure

} = authSlice.actions

export default authSlice.reducer 