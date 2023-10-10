import axios from "axios";
import { setCurrentAction, loginBegin, loginFailure, loginSuccess, registerBegin, registerFailure, registerSuccess, logoutBegin, logoutFailure, logoutSuccess } from './authSlice'

import { getBookBegin, getBookFailure, getBookSuccess, getOneBookBegin, getOneBookSuccess, getOneBookFailure } from './bookSlice'

import {addSlipBegin, addSlipSuccess, addSlipFailure, getSlipBegin, getSlipSuccess, getSlipFailure} from './slipSlice'

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
    } catch (err) {
        console.log(err.response.data);
        dispatch(logoutFailure());
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
    } catch(err){
        dispatch(addSlipFailure());
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
