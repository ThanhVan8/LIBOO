import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentAction: 'Sign In',
    login: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    register: {
        isFetching: false,
        error: false,
        success: false,
    },
    logout: {
        isFetching: false,
        error: false,
    },
    update: {
        isFetching: false,
        error: false,
        success: false,
    },
    upload:{
        isFetching: false,
        error: false,
        success: false,
    },
    getImage: {
        isFetching: false,
        error: false,
        success: false,
    }
  };

const authSlice = createSlice({
    name: 'auth',
    initialState,
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

        //update
        updateInfoBegin: (state) => {
            state.update.isFetching = true
        },
        updateInfoSuccess: (state, action) => {
            state.update.isFetching = false
            state.update.success = true
            state.update.error = false
            state.login.currentUser = action.payload
        },
        updateInfoFailure: (state) => {
            state.update.isFetching = false
            state.update.error = true
            state.update.success = false
        },

        //upload
        uploadBegin: (state) => {
            state.upload.isFetching = true
        },
        uploadSuccess: (state) => {
            state.upload.isFetching = false
            state.upload.success = true
            state.upload.error = false
        },
        uploadFailure: (state) => {
            state.upload.isFetching = false
            state.upload.error = true
            state.upload.success = false
        },

        //get image
        getImageBegin: (state) => {
            state.getImage.isFetching = true
        },
        getImageSuccess: (state) => {
            state.getImage.isFetching = false
            state.getImage.success = true
            state.getImage.error = false
        },
        getImageFailure: (state) => {
            state.getImage.isFetching = false
            state.getImage.error = true
            state.getImage.success = false
        }
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
    logoutFailure,

    updateInfoBegin,
    updateInfoSuccess,
    updateInfoFailure,
    
    uploadBegin,
    uploadSuccess,
    uploadFailure,

    getImageBegin,
    getImageSuccess,
    getImageFailure,

} = authSlice.actions


export default authSlice.reducer