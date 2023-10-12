import axios from "axios";
import { loginBegin, loginFailure, loginSuccess, logoutBegin, logoutFailure, logoutSuccess} from './authSlice'
import { getUserBegin, getUserSuccess, getUserFailure,
     addReaderBegin, addReaderSuccess, addReaderFailure, 
     updateReaderBegin, updateReaderSuccess, updateReaderFailure,
    deleteReaderBegin, deleteReaderSuccess, deleteReaderFailure,
} from './readerSlice'

import { addBookBegin, addBookFailure, addBookSuccess, deleteBookBegin, deleteBookFailure, deleteBookSuccess, getBookBegin, getBookFailure, getBookSuccess, 
    getOneBookBegin, 
    getOneBookFailure, 
    getOneBookSuccess, 
    updateBookBegin, updateBookFailure, updateBookSuccess 
} from "./bookSlice";

import {getSlipsBegin, getSlipsSuccess, getSlipsFailure, addSlipBegin, addSlipSuccess, addSlipFailure, returnBookBegin, returnBookSuccess, returnBookFailure,
    getSlipBegin, getSlipFailure, getSlipSuccess, deleteSlipBegin, deleteSlipSuccess, deleteSlipFailure
} from "./slipSlice"

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
        toast.success('Logout successfully!');
    } catch (err) {
        console.log(err.response.data);
        dispatch(logoutFailure());
        toast.error('Logout failed!');
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

export const updateReader = async (reader, id, accessToken, dispatch) => {
    dispatch(updateReaderBegin());
    try{
        const res = await axios.put('http://localhost:8000/api/user/'+ id, reader, {
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
        toast.error('Delete reader failed!');
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
        toast.error('Update book failed!');
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
        toast.error('Delete book failed!');
    }
}

export const getBookByISBN = async (accessToken, dispatch, isbn) => {
    dispatch(getOneBookBegin());
    try{
        const res = await axios.get ('http://localhost:8000/api/book/'+ isbn, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(getOneBookSuccess(res.data));
    }catch(err){
        dispatch(getOneBookFailure());
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
        toast.error('Borrow books failed!');
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
        toast.error(`Borrow books failed! ${err.response.data}`);
    }
}

//delete book from slip
export const deleteBookFromSlip = async (username, isbn, accessToken, dispatch) => {
    dispatch(returnBookBegin());
    try{
        const res = await axios.delete(`http://localhost:8000/api/slip/${username}/${isbn}`, {
            headers: {
                token: `Bearer ${accessToken}`
            },
        });
        dispatch(returnBookSuccess(res.data));
        toast.success('Return book successfully!');
    }catch(err) {
        dispatch(returnBookFailure())
        console.log(err.response.data);
        toast.error(`Return book failed! ${err.response.data}`);
    }
}

// get slip by username and isbn
export const getSlipByUsernameAndISBN = async (username, isbn, accessToken, dispatch) => {
    dispatch(getSlipBegin())
    try{
        const res = await axios.get(`http://localhost:8000/api/slip/${username}/${isbn}`, {
            headers: {
                token: `Bearer ${accessToken}`
            },
        });
        dispatch(getSlipSuccess(res.data));
    }catch(err) {
        dispatch(getSlipFailure())
        console.log(err.response.data);
    }
}

//delete slip
export const deleteSlip = async (accessToken, slipId, dispatch) => {
    dispatch(deleteSlipBegin());
    try{
        const res = await axios.delete(`http://localhost:8000/api/slip/${slipId}`, {
            headers: {
                token: `Bearer ${accessToken}`
            },
        })
        dispatch(deleteSlipSuccess(res.data));
        toast.success('Delete slip successfully!');
    } catch(err) {
        dispatch(deleteSlipFailure())
        console.log(err.response.data);
        toast.success('Delete slip failed!');
    }
}
