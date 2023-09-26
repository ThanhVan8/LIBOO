import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'Auth',
    initialState: {
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
        }
    }
})

export const {
    loginBegin,
    loginSuccess,
    loginFailure,

    registerBegin,
    registerSuccess,
    registerFailure

} = authSlice.actions

export default authSlice.reducer 