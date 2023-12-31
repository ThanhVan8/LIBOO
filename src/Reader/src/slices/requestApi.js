import axios from "axios";
import { setCurrentAction, loginBegin, loginFailure, loginSuccess, registerBegin, registerFailure, registerSuccess,
     logoutBegin, logoutFailure, logoutSuccess, updateInfoBegin, updateInfoSuccess, updateInfoFailure,
} from './authSlice'

import { getBookBegin, getBookFailure, getBookSuccess, getOneBookBegin, getOneBookSuccess, getOneBookFailure } from './bookSlice'

import {addSlipBegin, addSlipSuccess, addSlipFailure, getSlipBegin, getSlipSuccess, getSlipFailure,
    renewSlipBegin, renewSlipSuccess, renewSlipFailure
} from './slipSlice'

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//auth
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginBegin());
    try {
        const res = await axios.post('http://localhost:8000/api/auth/login', user);
        dispatch(loginSuccess(res.data));
        toast.success('Login successfully!');
        navigate('/');
    } catch (err) {
        console.log(err.response.data);
        dispatch(loginFailure());
        toast.error('Login failed!');
    }
}

export const registerUser = async (user, dispatch) => {
    dispatch(registerBegin())
    try {
        await axios.post('http://localhost:8000/api/auth/register', user);
        dispatch(registerSuccess());
        dispatch(setCurrentAction('Sign In'))
        toast.success('Sign up successfully!');
    } catch (err) {
        dispatch(registerFailure());
        toast.error(err.response.data);
    }
}

export const logoutUser = async (dispatch, id, accessToken) => {
    dispatch(logoutBegin());
    try{
        const res = await axios.post(`http://localhost:8000/api/auth/logout/${id}`, {}, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(logoutSuccess(res.data));
        toast.success('Logout successfully!');
    } catch (err) {
        console.log(err.response.data);
        dispatch(logoutFailure());
        toast.error(err.response.data);
    }
}

//user
export const refreshToken = async() => {
    try {
        const res = await axios.put('http://localhost:8000/api/auth/refresh', {
            withCredentials: true,
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

//update info
export const updateInfo = async (dispatch, id, accessToken, user) => {
    dispatch(updateInfoBegin());
    try{
        const res = await axios.put(`http://localhost:8000/api/auth/${id}`, user, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(updateInfoSuccess());
        dispatch(loginSuccess(res.data));
        toast.success('Update profile successfully!');
    } catch (err) {
        console.log(err.response.data);
        dispatch(updateInfoFailure());
        toast.error('Update profile failed!');
    }
}

// book
// GET all books
//books
export const getAllBooks = async (accessToken, dispatch) => {
    dispatch(getBookBegin());
    try{
        const res = await axios.get('http://localhost:8000/api/book',{
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(getBookSuccess(res.data));
    }catch(err){
        dispatch(getBookFailure());
    }
}
// GET one book by ISBN
export const getOneBook = async (accessToken, isbn, dispatch) => {
    dispatch(getOneBookBegin());
    try{
        const res = await axios.get(`http://localhost:8000/api/book/${isbn}`,{
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(getOneBookSuccess(res.data));
    } catch(err){
        dispatch(getOneBookFailure());
    }
}


//slip
//ADD slip
export const addSlip = async (accessToken, username, isbn, dispatch) => {
    dispatch(addSlipBegin());
    try{
        const res = await axios.post(`http://localhost:8000/api/slip/reader/${username}/${isbn}`, {}, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(addSlipSuccess(res.data));
        toast.success('Borrow book successfully!');
    } catch(err){
        dispatch(addSlipFailure());
        toast.error(`Borrow book failed! (${err.response.data})`);
    }
}

// GET all accepted slips of 1 users
export const getSlipsOfUser = async (accessToken, id, dispatch) => {
    dispatch(getSlipBegin());
    try{
        const res = await axios.get(`http://localhost:8000/api/slip/${id}`,{
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(getSlipSuccess(res.data));
    } catch(err){
        dispatch(getSlipFailure());
    }
}

// Renew dueDate for 1 book
export const renewDueDate = async (accessToken, slipId, isbn, dispatch) => {
    dispatch(renewSlipBegin());
    try{
        const res = await axios.put(`http://localhost:8000/api/slip/${slipId}/${isbn}`,{} ,{
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
    dispatch(renewSlipSuccess(res.data))
    toast.success('Renew book successfully!');
    } catch(err){
        dispatch(renewSlipFailure());
        toast.error(err.response.data);
    }
}