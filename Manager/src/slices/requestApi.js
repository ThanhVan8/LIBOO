import axios from "axios";
import { loginBegin, loginFailure, loginSuccess, logoutBegin, logoutFailure, logoutSuccess} from './authSlice'
import { getUserBegin, getUserSuccess, getUserFailure, addReaderBegin, addReaderSuccess, addReaderFailure, updateReaderBegin, updateReaderSuccess, updateReaderFailure,
    deleteReaderBegin, deleteReaderSuccess, deleteReaderFailure 
} from './readerSlice'

import { addBookBegin, addBookFailure, addBookSuccess, deleteBookBegin, deleteBookFailure, deleteBookSuccess, getBookBegin, getBookFailure, getBookSuccess, 
    updateBookBegin, updateBookFailure, updateBookSuccess 
} from "./bookSlice";

import {getSlipsBegin, getSlipsSuccess, getSlipsFailure, addSlipBegin, addSlipSuccess, addSlipFailure} from "./slipSlice"

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

//auth
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginBegin());
    try {
        const res = await axios.post('http://localhost:8000/api/auth/login', user);
        if (res.data.admin === true) {
            dispatch(loginSuccess(res.data));
            toast.success('Login successfully!');
            navigate('/');
        }
        else {
            dispatch(loginFailure());
            toast.error('You are not admin');
        } 
        
    } catch (err) {
        console.log(err.response.data);
        dispatch(loginFailure());
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

//readers
export const getAllUsers = async (accessToken, dispatch) => {
    dispatch(getUserBegin());
    try{
        const res = await axios.get('http://localhost:8000/api/user',{
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(getUserSuccess(res.data));
    }catch(err){
        dispatch(getUserFailure());
    }
}

export const addReader = async (reader, accessToken, dispatch) => {
    dispatch(addReaderBegin());
    try{
        const res = await axios.post('http://localhost:8000/api/user', reader, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(addReaderSuccess(res.data));
        toast.success('Add reader successfully!');
    }catch(err){
        dispatch(addReaderFailure())
        console.log(err.response.data);
        toast.error('Add reader failed!');
    }
}

export const updateReader = async (user, id, accessToken, dispatch) => {
    dispatch(updateReaderBegin());
    try{
        const res = await axios.put('http://localhost:8000/api/user/'+ id, user, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(updateReaderSuccess(res.data));
        toast.success('Update reader successfully!');
    }catch(err) {
        dispatch(updateReaderFailure())
        console.log(err.response.data);
        toast.error('Update reader failed!');
    }
}

export const deleteReader = async (accessToken, dispatch, id) => {
    dispatch(deleteReaderBegin());
    try{
        const res = await axios.delete('http://localhost:8000/api/user/'+ id, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(deleteReaderSuccess(res.data));
        toast.success('Delete reader successfully!');
    }catch(err) {
        dispatch(deleteReaderFailure())
        console.log(err.response.data);
        toast.success('Delete reader failed!');
    }
}


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

export const addBook = async (book, accessToken, dispatch) => {
    dispatch(addBookBegin());
    try{
        const res = await axios.post('http://localhost:8000/api/book', book, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(addBookSuccess(res.data));
        toast.success('Add book successfully!');
    }catch(err){
        dispatch(addBookFailure())
        console.log(err.response.data);
        toast.error('Add book failed!');
    }
}

export const updateBook = async (book, id, accessToken, dispatch) => {
    dispatch(updateBookBegin());
    try{
        const res = await axios.put('http://localhost:8000/api/book/'+ id, book, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(updateBookSuccess(res.data));
        toast.success('Update book successfully!');
        
    }catch(err) {
        dispatch(updateBookFailure())
        console.log(err.response.data);
        toast.success('Update book failed!');
    }
}

export const deleteBook = async (accessToken, dispatch, id) => {
    dispatch(deleteBookBegin());
    try{
        const res = await axios.delete('http://localhost:8000/api/book/'+ id, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(deleteBookSuccess(res.data));
        toast.success('Delete book successfully!');
    }catch(err) {
        dispatch(deleteBookFailure())
        console.log(err.response.data);
        toast.success('Delete book failed!');
    }
}

//slips
export const getAllSlips = async (accessToken, dispatch) => {
    dispatch(getSlipsBegin());
    try{
        const res = await axios.get('http://localhost:8000/api/slip/unaccepted',{
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(getSlipsSuccess(res.data));
    }catch(err){
        dispatch(getSlipsFailure());
    }
}

//accepted slips
export const getAllAcceptedSlips = async (accessToken, dispatch) => {
    dispatch(getSlipsBegin());
    try{
        const res = await axios.get('http://localhost:8000/api/slip/accepted',{
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(getSlipsSuccess(res.data));
    }catch(err){
        dispatch(getSlipsFailure());
    }
}

//making slip by id
export const addSlipById = async (id, accessToken, dispatch) => {
    dispatch(addSlipBegin());
    try {
        const res = await axios.post(`http://localhost:8000/api/slip/manager/id/${id}`, {},
        {
            headers: {
                token: `Bearer ${accessToken}`
            },
        });
        dispatch(addSlipSuccess(res.data));
        toast.success('Borrow books successfully!');
    } catch (err) {
        dispatch(addSlipFailure())
        console.log(err.response.data);
        toast.success('Borrow books failed!');
    }
}

//making slip by username
export const addSlipByUsername = async (username, isbns, accessToken, dispatch) => {
    dispatch(addSlipBegin());
    try{
        const res = await axios.post(`http://localhost:8000/api/slip/manager/username/${username}`, {borrowList: isbns.map((isbn) => ({ISBN: isbn}))},
        {
            headers: {
                token: `Bearer ${accessToken}`
            },
        });
        dispatch(addSlipSuccess(res.data));
        toast.success('Borrow books successfully!');
    } catch (err){
        dispatch(addSlipFailure())
        console.log(err.response.data);
        toast.success('Borrow books failed!');
    }
}